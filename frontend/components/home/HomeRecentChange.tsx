"use client";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Album } from "./data/albums";
import { playlists } from "./data/playlists";
import { MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/preview.css";
import "md-editor-rt/lib/style.css";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Commit, RecentChange } from "@/app/(navigablepages)/page";
import Link from "next/link";

interface HomeRecentChangeProps extends React.HTMLAttributes<HTMLDivElement> {
  change: RecentChange;
}

const textprova = `## 😲 md-editor-rt

Markdown Editor for React, developed in jsx and typescript, support different themes、beautify content by prettier.

### 🤖 Base

**bold**, <u>underline</u>, _italic_, ~~line-through~~, superscript<supsubscript>26</supsubscript subscript<sub>[1]</sub>inline code，[link](https://github.com/imzbf)

> quote: I Have a Dream

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

- [ ] Friday
- [ ] Saturday
- [x] Sunday

![Picture](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)

## 🤗 Demo



## 🖨 Text

The Old Man and the Sea served to reinvigorate Hemingway's literary reputation and prompted a reexamination of his entire body of work.

## 📈 Table

| nickname | from             |
| -------- | ---------------- |
| zhijian  | ChongQing, China |

## 📏 Formula

Inline: $x+y^{2x}$

$$
\sqrt[3]{x}
$$

## 🧬 Diagram


## 🪄 Alert

!!! note Supported Types

note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention

!!!

## ☘️ em...
`;

export function HomeRecentChange({ change }: HomeRecentChangeProps) {
  return (
    <Link href={`/${change.commit.file.courseId}`}>
      <Card className="space-y-3 w-full !mx-1 hover:scale-[1.01]  transition-all cursor-pointer select-none">
        <CardHeader className="flex flex-row justify-between  items-center pb-0">
          <div className="space-y-1 w-fit">
            <h3 className="font-bold leading-none">{change.courseName}</h3>
            <p className="text-xs text-muted-foreground">
              {change.user.displayName}
            </p>
          </div>
          <div className="!m-0 flex">
            {change.authors.map((a) => {
              return (
                <Avatar
                  key={a}
                  className="h-8 w-8 translate-x-4 z-30 border-2 border-muted"
                >
                  <AvatarImage src={a} />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="flex gap-4 items-center">
          <div className="h-12 flex gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={change.user.photoUrl} />
              <AvatarFallback>
                {change.user.displayName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <Separator orientation="vertical" />
          </div>
          <p className="max-h-12 text-sm line-clamp-2">
            {change.commit.message}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
