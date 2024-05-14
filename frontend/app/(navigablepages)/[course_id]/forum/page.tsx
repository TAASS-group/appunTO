import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Question from "@/components/forum/Question";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { questions } from "@/components/forum/data/questions";

function page() {
  const getPreviewText = (text: string, length: number): string => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  const text: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient";

  return (
    <div>
      <div className="flex justify-between items-center pt-12 pb-20">
        <div className="w-[148.2px]"></div>
        <h1 className="text-4xl font-semibold leading-none tracking-tight text-center ">
          Forum intelligenza artificiale laboratorio
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Plus size={15} /> Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Question</DialogTitle>
              <DialogDescription>
                Write down here your question. Click save when you&#39;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 ">
              <div className="flex items-center gap-4">
                <Label htmlFor="name" className="col-span-1">
                  Topic
                </Label>
                <Input
                  id="name"
                  defaultValue=""
                  className="col-span-3"
                />
              </div>
              <Textarea placeholder="Type your question here." />
            </div>
            <DialogFooter>
              <Button type="submit">Publish question</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col space-y-4">
        {questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
}

export default page;
