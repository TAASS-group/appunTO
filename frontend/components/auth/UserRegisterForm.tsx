"use client";

import * as React from "react";

import { cn, genericFetchRequest } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, uploadImageAndGetURL } from "@/lib/firebase";
import ImageInput from "../ImageInput";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [email, setEmail] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [photo, setPhoto] = React.useState<File>();
  const [password, setPassword] = React.useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (!email || !username || !phone || !photo || !password) {
      setError("Please fill in all the fields");
      setIsLoading(false);
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        const newPhoto = photo
          ? await uploadImageAndGetURL(photo)
          : "https://firebasestorage.googleapis.com/v0/b/fir-spike-9db16.appspot.com/o/images%2Fgiphy.gif?alt=media&token=bdbcba2b-6abc-42b8-9f34-80ad2992cc6a";

        console.log("NEW PHOTOOOO", newPhoto);

        const res = await genericFetchRequest(
          "/user/update",
          "POST",
          {
            uid: user.uid,
            email: user.email,
            displayName: username,
            phoneNumber: "+39" + phone,
            photoUrl: newPhoto,
          },
          {
            "Content-Type": "application/json",
          }
        );

        console.log("USER UPDATE", res);

        /* signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/",
        }); */
      })
      .catch((error) => {
        console.log("ERRORE CREAZIONE UTENTE", error);
        setError("Error creating che user");
      });

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="phone">
              Phone
            </Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              placeholder="phone"
              type="text"
              autoCapitalize="none"
              autoComplete="phone"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="photo">
              Photo
            </Label>
            <ImageInput
              value={photo}
              setValue={setPhoto}
              width={100}
              height={100}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="*******************"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
