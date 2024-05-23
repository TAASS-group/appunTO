import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface QuestionType {
  topic: string;
  text: string;
  id: number;
  userid: number;
  username: string;
  imageUrl: string;
}

export default function Question({ question, course_id }: { question: QuestionType, course_id: string}) {

 

  return (
    <Card>
      <CardHeader className="pl-5">
        <CardTitle>{question.topic}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 items-center py-0">
        <div className="h-12 flex gap-4">
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

          <Separator orientation="vertical" />
        </div>
        <p className="max-h-12 text-sm line-clamp-2">{question.text}</p>
      </CardContent>

      <CardFooter className="flex justify-end pb-1">
        <Link
          href={{
            pathname: `/${course_id}/forum/${question.id}/answer`,
           
          }}
        >
          <Button variant="link">View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
