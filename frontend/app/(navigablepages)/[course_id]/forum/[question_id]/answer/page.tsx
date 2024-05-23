"use client";
import React, { use, useEffect, useState } from "react";

import Answers from "@/components/forum/Answers";
import QuestionInAnswer from "@/components/forum/QuestionInAnswer";

import { Separator } from "@/components/ui/separator";

import { ComboboxDemo } from "@/components/forum/combobox";
import { useParams, useRouter } from "next/navigation";
import { QuestionType } from "@/components/forum/data/questions";
import { AnswerType } from "@/components/forum/data/answers";

const Page = () => {
  const params = useParams();
  const question_id = params.question_id;

  const [question, setQuestion] = useState<QuestionType>({ topic: "", text: "", id: 0, userid: 0, username: "", imageUrl: ""});
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  useEffect(() => {
    // Fetch data from external API
    fetch(`http://localhost:8080/question/getQuestionById/${question_id}`)
      .then((res) => res.json())
      .then((data) => {
        const question = {
          topic: data.question.topic,
          text: data.question.text,
          id: data.question.id,
          userid: data.question.idUser,
          username: data.username,
          imageUrl: data.imageUrl,
        };
        console.log(question);
        setQuestion(question);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },[question_id]);

  useEffect(() => {

    fetch(`http://localhost:8080/answer/getAll/${question_id}`)
      .then((res) => res.json())
      .then((data) => {
        const answers = data.map(({ answer, username, imageUrl }: { answer: AnswerType, username: string, imageUrl: string }) => ({
          text: answer.text,
          id: answer.id,
          userid: answer.idUser,
          upvotes: answer.upvotes,
          username: username,
          imageUrl: imageUrl,
        }));
        setAnswers(answers);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [question_id]);

  return (
    <div className=" border bg-card text-card-foreground shadow my-8  space-y-4">
      <QuestionInAnswer key={question.id} question={question}/>
      <Separator />

      <div className="flex pl-6 pr-6 py-4 mx-4 my-4 gap-2 ">
        <h3 className="text-xl font-semibold leading-none tracking-tight text-center ">
          
          Answers  
        </h3>
        <h3 className="text-xl font-semibold leading-none tracking-tight text-center">
          {answers.length}
        </h3>
        
      </div>
      {answers.map((answer) => (
        <Answers key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

export default Page;
