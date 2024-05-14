"use client";
import React, { useState } from "react";

import Answers from "@/components/forum/Answers";
import QuestionInAnswer from "@/components/forum/QuestionInAnswer";

import { Separator } from "@/components/ui/separator";

import { ComboboxDemo } from "@/components/forum/combobox";
import { answers } from "@/components/forum/data/answers";

const Page = () => {
  return (
    <div className=" border bg-card text-card-foreground shadow my-8  space-y-4">
      <QuestionInAnswer />
      <Separator />

      <div className="flex justify-between pl-6 pr-6">
        <h3 className="text-xl font-semibold leading-none tracking-tight text-center mx-4 my-4">
          {" "}
          Answers
        </h3>
        <ComboboxDemo />
      </div>
      {answers.map((answer) => (
        <Answers key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

export default Page;
