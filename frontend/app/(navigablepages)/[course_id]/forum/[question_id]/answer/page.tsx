"use client";
import React, { useEffect, useState } from "react";

import Answers from "@/components/forum/Answers";
import QuestionInAnswer from "@/components/forum/QuestionInAnswer";
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

import { ComboboxDemo } from "@/components/forum/combobox";
import { useParams, useRouter } from "next/navigation";
import { QuestionType } from "@/components/forum/data/questions";
import { AnswerType } from "@/components/forum/data/answers";
import { useQuery } from "react-query";
import Icon from "md-editor-rt/lib/types/MdEditor/components/Icon/Icon";
import { FanIcon, Plus, RadioIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Page = () => {
  const params = useParams();
  const question_id = params.question_id as string;
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [text, setText] = useState("");

  const handleButtonSubmit = async () => {
    if (text === "") {
      setIsFieldEmpty(true);
    } else {
      const res = await fetch(
        `http://localhost:8080/answer/createAnswer/${question_id}`,
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
      refetchAnswers();
    }
  };

  const fetchQuestion = async (question_id: string) => {
    const res = await fetch(
      `http://localhost:8080/question/getQuestionById/${question_id}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return {
      topic: data.question.topic,
      text: data.question.text,
      id: data.question.id,
      userid: data.question.idUser,
      username: data.username,
      imageUrl: data.imageUrl,
    };
  };

  const fetchAnswers = async (question_id: string) => {
    const res = await fetch(
      `http://localhost:8080/answer/getAll/${question_id}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.map(
      ({
        answer,
        username,
        imageUrl,
      }: {
        answer: AnswerType;
        username: string;
        imageUrl: string;
      }) => ({
        text: answer.text,
        id: answer.id,
        userid: answer.idUser,
        upvotes: answer.upvotes,
        username: username,
        imageUrl: imageUrl,
      })
    );
  };

  const {
    data: question,
    error: questionError,
    isLoading: questionLoading,
  } = useQuery(["question", question_id], () => fetchQuestion(question_id));
  const {
    data: answers,
    error: answersError,
    isLoading: answersLoading,
    refetch: refetchAnswers,
  } = useQuery(["answers", question_id], () => fetchAnswers(question_id));

  if (questionLoading || answersLoading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <div className="flex justify-center items-center gap-2">
          <Icons.spinner className="animate-spin w-12 h-12" />
          <p className="text-center">Loading answers</p>
        </div>
      </div>
    );
  }

  if (questionError) {
    return <div>An error occurred: {(questionError as any).message}</div>;
  }

  if (answersError) {
    return <div>An error occurred: {(answersError as any).message}</div>;
  }

  return (
    <div className=" border bg-card text-card-foreground shadow lg:my-8 my-0  space-y-4 mx-0">
      <QuestionInAnswer
        key={question?.id}
        question={question}
        refetch={refetchAnswers}
      />
      <Separator />

      <div className="flex justify-between items-center lg:px-6 lg:py-4 lg:mx-4 lg:my-4 gap-2  mx-0 px-4 pb-5">
        <h3 className="text-xl font-semibold leading-none tracking-tight text-center ">
          Answers {answers.length}
        </h3>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2 flex lg:hidden">
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
      {answers.map((answer: any) => (
        <Answers key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

export default Page;
