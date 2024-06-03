import { Separator } from "@/components/ui/separator";
import LikeButton from "@/components/forum/LikeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnswerType } from "./data/answers";
import { useLocation } from "react-router-dom";



export default function Answers({ answer }: { answer: AnswerType }) {
 
  return (
    <div className="lg:pl-12 lg:pr-12 pl-0 pr-6 ">
      <div className="flex items-stretch gap-1 lg:gap-2 mx-4">
        <Avatar className="h-9 w-9 lg:h-12 lg:w-12 ">
        <AvatarImage src={
                answer.imageUrl == ""
                  ? "https://github.com/shadcn.png"
                  : answer.imageUrl
              }/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Separator orientation="vertical" className="self-stretch" />
        <p className="lg:text-sm text-xs border-l-2 pl-2 lg:pl-4 text-justify">
            {answer.text}
          
        </p>
      </div>
      <LikeButton likecount={answer.upvotes} answerId={answer.id} />
      <Separator />
    </div>
  );
}
