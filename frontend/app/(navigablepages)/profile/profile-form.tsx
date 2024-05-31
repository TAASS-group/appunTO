"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn, genericFetchRequest } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import React from "react";
import { uploadImageAndGetURL } from "@/lib/firebase";
import { Label } from "@/components/ui/label";
import ImageInput from "@/components/ImageInput";

const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z.string().min(10).max(10),
  bio: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const phonePrfixRemover = (
  full_number: string | undefined
): {
  prx: string;
  number: string;
} => {
  if (!full_number) {
    return { prx: "+39", number: "0000000000" };
  }
  let prx = "";
  let number = "";

  for (let index = full_number.length - 1; index >= 0; index--) {
    if (index >= full_number.length - 10) {
      number = full_number[index] + number;
    } else {
      prx = full_number[index] + prx;
    }
  }
  console.log(prx, number);

  return {
    prx,
    number,
  };
};

export function ProfileForm() {
  const { data: session, update } = useSession();
  const [photo, setPhoto] = React.useState<File>();
  const [phonePrefix, setPhonePrefix] = React.useState(
    session?.user.phoneNumber
      ? phonePrfixRemover(session?.user.phoneNumber).prx
      : "+39"
  );

  const defaultValues: Partial<ProfileFormValues> = {
    ...session?.user,
    phone: phonePrfixRemover(session?.user.phoneNumber).number,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const newPhoto = photo
      ? await uploadImageAndGetURL(photo)
      : session?.user.photoURL;

    const res = await genericFetchRequest(
      "/user/update",
      "POST",
      {
        uid: session?.user.uid,
        email: data.email,
        displayName: data.displayName,
        phoneNumber: phonePrefix + data.phone,
        photoUrl: newPhoto,
        bio: data.bio,
      },
      {
        "Content-Type": "application/json",
      }
    );

    console.log("USER UPDATE", res);

    update({
      email: data.email,
      displayName: data.displayName,
      phoneNumber: phonePrefix + data.phone,
      photoURL: newPhoto,
      bio: data.bio,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-1">
          <Label htmlFor="photo">Photo</Label>
          <ImageInput
            value={photo}
            setValue={setPhoto}
            width={100}
            height={100}
            defaultImg={session?.user.photoURL}
          />
        </div>
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/profile">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <div className="flex">
                  <Select
                    value={phonePrefix}
                    onValueChange={(e: string) => setPhonePrefix(e)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue>{phonePrefix}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+39">+39</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="1234567890"
                    {...field}
                    className="ml-2 grow "
                  />
                </div>
              </FormControl>
              <FormDescription>
                Your phone number is used for account security and notifications
                only.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
