import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { QuestionType } from "./data/questions";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { set } from "date-fns";
export default function QuestionInAnswer({
  question,
  refetch,
}: {
  question: any;
  refetch: any;
}) {
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [text, setText] = useState("");

  const handleButtonSubmit = async () => {
    if (text === "") {
      setIsFieldEmpty(true);
    } else {
      const res = await fetch(
        `http://localhost:8080/answer/createAnswer/${question.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            idUser: (session?.user as any).uid,
            upvotes: 0,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      setText("");
      setIsDialogOpen(false);
      refetch();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center my-8 mx-2 pl-6 ">
        <h1 className="text-3xl font-semibold leading-none tracking-tight text-center ">
          {question.topic}
        </h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Plus size={15} /> Add Answer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Answer</DialogTitle>
              <DialogDescription>
                Write down here your answer. Click save when you&#39;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 ">
              <Textarea
                placeholder="Type your answer here."
                className={isFieldEmpty ? "border-red-500" : ""}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setIsFieldEmpty(false);
                }}
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleButtonSubmit}>
                Publish answer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-stretch gap-2 px-4 pb-10 pl-7 pr-12">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={
              question.imageUrl == ""
                ? "https://github.com/shadcn.png"
                : question.imageUrl
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Separator orientation="vertical" className="self-stretch" />
        <p className=" text-sm border-l-2 pl-4 text-justify">{question.text}</p>
      </div>
    </div>
  );
}
