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
import  { QuestionType }  from "./data/questions";

export default function Question({ question }: { question: QuestionType }) {
  return (
    <Card>
      <CardHeader className="pl-5">
        <CardTitle>{question.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 items-center py-0">
        <div className="h-12 flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Separator orientation="vertical" />
        </div>
        <p className="max-h-12 text-sm line-clamp-2">
            {question.text}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end pb-1">
        <Button variant="link">View</Button>
      </CardFooter>
    </Card>
  );
}
