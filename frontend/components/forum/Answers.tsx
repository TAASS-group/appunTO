import { Separator } from "@/components/ui/separator";
import LikeButton from "@/components/forum/LikeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnswerType } from "./data/answers";



export default function Answers({ answer }: { answer: AnswerType }) {
  return (
    <div className="pl-12 pr-12">
      <div className="flex items-stretch gap-2 mx-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Separator orientation="vertical" className="self-stretch" />
        <p className=" text-sm border-l-2 pl-4 text-justify">
            {answer.text}
          
        </p>
      </div>
      <LikeButton likecount={answer.upvotes} />
      <Separator />
    </div>
  );
}
