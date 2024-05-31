"use client";
import React, { use, useEffect, useState } from "react";

import Answers from "@/components/forum/Answers";
import QuestionInAnswer from "@/components/forum/QuestionInAnswer";

import { Separator } from "@/components/ui/separator";

import { ComboboxDemo } from "@/components/forum/combobox";
import { useParams, useRouter } from "next/navigation";
import { QuestionType } from "@/components/forum/data/questions";
import { AnswerType } from "@/components/forum/data/answers";
import { useQuery } from "react-query";
import Icon from "md-editor-rt/lib/types/MdEditor/components/Icon/Icon";
import { FanIcon, RadioIcon } from "lucide-react";
import { Icons } from "@/components/icons";

const Page = () => {
  const params = useParams();
  const question_id = params.question_id as string;

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
    return <Icons.spinner />;
  }

  if (questionError) {
    return <div>An error occurred: {(questionError as any).message}</div>;
  }

  if (answersError) {
    return <div>An error occurred: {(answersError as any).message}</div>;
  }

  return (
    <div className=" border bg-card text-card-foreground shadow my-8  space-y-4">
      <QuestionInAnswer
        key={question?.id}
        question={question}
        refetch={refetchAnswers}
      />
      <Separator />

      <div className="flex pl-6 pr-6 py-4 mx-4 my-4 gap-2 ">
        <h3 className="text-xl font-semibold leading-none tracking-tight text-center ">
          Answers
        </h3>
        <h3 className="text-xl font-semibold leading-none tracking-tight text-center">
          {answers.length}
        </h3>
      </div>
      {answers.map((answer: any) => (
        <Answers key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

export default Page;
