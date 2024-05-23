'use client';
import React, { use, useEffect, useState } from "react";

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
import { useParams } from "next/navigation";


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

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [forum, setForum] = useState<ForumType>({ id: 0, name: ""});
  const params = useParams();
  const course_id = params.course_id;

  useEffect(() => {
    // Fetch data from external API
    fetch(`http://localhost:8080/forum/getForumByCourseId/${course_id}`)
      .then((res) => res.json())
      .then((data) => {
        const forum = {
          id: data.idForum,
          name: data.name,
        };
        console.log(forum);
        setForum(forum);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [course_id]);
  
  useEffect(() => {
    // Fetch data from external API
    fetch(`http://localhost:8080/question/getAll/${course_id}`)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.map(({ question, username, imageUrl }: { question: any, username: string, imageUrl: string }) => ({
          topic: question.topic,
          text: question.text,
          id: question.id,
          userid: question.idUser,
          username: username,
          imageUrl: imageUrl,
        }));
        setQuestions(questions);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [course_id]);


  

  return (
    <div>
      <div className="flex justify-between items-center pt-12 pb-20">
        <div className="w-[148.2px]"></div>
        <h1 className="text-4xl font-semibold leading-none tracking-tight text-center ">
          {forum.name}
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
          <Question key={question.id} question={question} course_id={course_id.toString()} />
        ))}
      </div>
    </div>
  );
} export default Page;
 


