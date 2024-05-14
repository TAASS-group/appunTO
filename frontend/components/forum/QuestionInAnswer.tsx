import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function QuestionInAnswer() {
  return (
    <div>
      <div className="flex justify-between items-center my-8 mx-2 pl-6 ">
        <h1 className="text-3xl font-semibold leading-none tracking-tight text-center ">
          Nuovelle AI e Machine Learning
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
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
              <Textarea placeholder="Type your answer here." />
            </div>
            <DialogFooter>
              <Button type="submit">Publish answer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-stretch gap-2 px-4 pb-10 pl-7 pr-12">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Separator orientation="vertical" className="self-stretch" />
        <p className=" text-sm border-l-2 pl-4 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
          excepturi quia aut qui animi nobis explicabo veniam rem assumenda
          temporibus. Recusandae id distinctio obcaecati eaque ad cupiditate
          velit suscipit autem? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quia odit quas eos blanditiis cumque? Corrupti quasi
          officia odit veniam id quos ipsum atque maiores debitis. Quos quod qui
          corrupti eligendi. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Voluptatem excepturi quia aut qui animi nobis explicabo veniam
          rem assumenda temporibus. Recusandae id distinctio obcaecati eaque ad
          cupiditate velit suscipit autem? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quia odit quas eos blanditiis cumque?
          Corrupti quasi officia odit veniam id quos ipsum atque maiores
          debitis. Quos quod qui corrupti eligendi. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Voluptatem excepturi quia aut qui animi
          nobis explicabo veniam rem assumenda temporibus. Recusandae id
          distinctio obcaecati eaque ad cupiditate velit suscipit autem? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quia odit quas eos
          blanditiis
        </p>
      </div>
    </div>
  );
}
