"use client";
import React, { use, useEffect, useState } from "react";
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
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

import { useSession } from "next-auth/react";
import { Icons } from "@/components/icons";


interface QuestionType {
  topic: string;
  text: string;
  id: number;
  userid: number;
  username: string;
  imageUrl: string;
}

interface ForumType {
  id: number;
  name: string;
}

function Page() {
  const params = useParams();
  const course_id = params.course_id as string;
  const { data: session } = useSession();
  console.log((session?.user as any).uid);
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);

  const fetchForum = async (course_id: string) => {
    const res = await fetch(
      `http://localhost:8080/forum/getForumByCourseId/${course_id}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return {
      id: data.idForum,
      name: data.name,
    };
  };

  const fetchQuestions = async (course_id: string) => {
    const res = await fetch(
      `http://localhost:8080/question/getAll/${course_id}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.map(
      ({
        question,
        username,
        imageUrl,
      }: {
        question: any;
        username: string;
        imageUrl: string;
      }) => ({
        topic: question.topic,
        text: question.text,
        id: question.id,
        userid: question.idUser,
        username: username,
        imageUrl: imageUrl,
      })
    );
  };

  const handleQuestionDialog = () => {
    setIsDialogOpen(true);
  };

  const handleQuestionSubmit = async () => {
    if (topic == "" || text == "") {
      setIsFieldEmpty(true);
      return;
    }
    setIsFieldEmpty(false);

    try {
      const response = await fetch(
        `http://localhost:8080/question/createQuestion/${forum?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: topic,
            idUser: (session?.user as any).uid,
            text: text,
            // Add any other data required by your API here
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setText("");
      setTopic("");
      refetchQuestions();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
    }
    // Handle the response data here
    // For example, you might want to add the new question to your questions list
  };

  const {
    data: forum,
    error: forumError,
    isLoading: forumLoading,
    
  } = useQuery(["forum", course_id], () => fetchForum(course_id));
  const {
    data: questions,
    error: questionsError,
    isLoading: questionsLoading,
    refetch: refetchQuestions,
  } = useQuery(["questions", course_id], () => fetchQuestions(course_id));

  if (forumLoading || questionsLoading) {
    return <Icons.spinner />;
  }

  if (forumError) {
    return <div>Error: {(forumError as any).message}</div>;
  }

  if (questionsError) {
    return <div>Error: {(questionsError as any).message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center pt-12 pb-20">
        <div className="w-[148.2px]"></div>
        <h1 className="text-4xl font-semibold leading-none tracking-tight text-center ">
          {forum?.name}
        </h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex gap-2"
              onClick={handleQuestionDialog}
            >
              <Plus size={15} /> Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" >
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
                  value={topic}
                  defaultValue=""
                  className={isFieldEmpty ? "border-red-500 col-span-3" : "col-span-3"}
                  onChange={(e) => {setTopic(e.target.value)
                    setIsFieldEmpty(false);}
                  }
                />
              </div>
              <Textarea
              className={isFieldEmpty ? "border-red-500" : ""}
                placeholder="Type your question here."
                value={text}
                onChange={(e) => {setText(e.target.value)
                  setIsFieldEmpty(false);
                }}
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleQuestionSubmit}>
                Publish question
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col space-y-4">
        {questions?.map((question: any) => (
          <Question
            key={question.id}
            question={question}
            course_id={course_id.toString()}
          />
        ))}
      </div>
    </div>
  );
}
export default Page;
