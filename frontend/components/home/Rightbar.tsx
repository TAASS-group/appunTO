import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { listenNowAlbums, Album } from "./data/albums";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function Righbar() {
  return (
    <div className="space-y-8 pr-4 py-4 ">
    <div>

    
      <h2 className=" lg:px-2 text-lg font-semibold tracking-tight text-left pb-2">
        Top Autori
      </h2>
      <div className="!m-0 flex flex-row-reverse box-border rounded-sm shadow-background  items-center mb-12 ">
        {listenNowAlbums.map((a, index) => {
          return (
            <Avatar
              key={a.name}
              style={{
                transform: `translateX(${0.85 * index}rem) `,
              }}
              className="h-10 w-10 border-2 border-muted"
            >
              <AvatarImage src={a.cover} />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          );
        })}
      </div>
      </div>
      <div className="">
        <h2 className=" lg:px-2 text-lg font-semibold tracking-tight text-left pb-2">
          Appunti più visitati
        </h2>
        <div className="flex flex-col bg-muted box-border rounded-lg shadow-md items-start mb-12">
          <Link
            href={{
              pathname: ``,
            }}
          >
            <Button variant="link" className="line-clamp-1 px-2">Software Engeniring</Button>
          </Link>
          <Separator />
          <Link
            href={{
              pathname: ``,
            }}
          >
            <Button variant="link"  className="line-clamp-1 px-2">Svlippo applicazioni software</Button>
          </Link>
          <Separator />
          <Link
            href={{
              pathname: ``,
            }}
          >
            <Button variant="link"  className="line-clamp-1 px-2" >
              Machine learning
            </Button>
          </Link>
          
        </div>
      </div>
      <div className="shadow-background ">
        <h2 className=" lg:px-2 text-lg font-semibold tracking-tight text-left pb-2">
          Sources generali
        </h2>
        <div className=" flex flex-col bg-muted box-border rounded-lg  shadow-md items-start mb-12 ">
          <Link
            href={{
              pathname: ``,
            }}
          >
            <Button variant="link" className="text-xs px-2">https://forumservice/file/newFile</Button>
          </Link>
          <Separator />
          <Link
            href={{
              pathname: ``,
            }}
          >
            <Button variant="link" className="text-xs px-2">https://forumservice/file/newFile</Button>
          </Link>
          <Separator />
          <Link
            href={{
              pathname: ``,
            }}
          >
            <Button variant="link" className="text-xs px-2">
              https://forumservice/file/newFile
            </Button>
          </Link>
          
        </div>
      </div>
      <div className="">
        <h2 className=" lg:px-2 text-lg font-semibold tracking-tight text-left pb-2 ">
          Top contributors
        </h2>
        <div className=" flex flex-col bg-muted box-border rounded-lg  shadow-md items-start py-2 ">
          <div className="flex flex-row items-center gap-2 pl-2">
            <Avatar
              className="h-10 w-10 border-2 border-muted "
            >
              <AvatarImage src="https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <p className="text-xs ">Simone multari</p>
            <div className="flex flex-col gap-y-1 items-center">
                <p className="text-xs  font-semibold">In/del</p>
                <p className="text-xs  text-green-500">+500</p>
                <p className="text-xs text-red-500">-70</p>
            </div>
            <div className="flex flex-col items-center gap-y-1">
                <p className="text-xs font-bold">%</p>
                <p className="text-xs ">40 %</p>
                <div className="h-4"></div>
            </div>
            
            
          </div>
          <Separator className="my-2"/>
          <div className="flex flex-row items-center gap-2 pl-2">
            <Avatar
              className="h-10 w-10 border-2 border-muted "
            >
              <AvatarImage src="https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <p className="text-xs ">Loris Signoretti</p>
            <div className="flex flex-col gap-y-1 items-center">
                <p className="text-xs  font-semibold">In/del</p>
                <p className="text-xs  text-green-500">+500</p>
                <p className="text-xs text-red-500">-100</p>
            </div>
            <div className="flex flex-col items-center gap-y-1">
                <p className="text-xs font-bold">%</p>
                <p className="text-xs ">30 %</p>
                <div className="h-4"></div>
            </div>
            
            
          </div>
          <Separator className="my-2"/>
          <div className="flex flex-row items-center gap-2 pl-2 ">
            <Avatar
              className="h-10 w-10 border-2 border-muted "
            >
              <AvatarImage src="https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <p className="text-xs ">Mattia Mondino</p>
            <div className="flex flex-col gap-y-1 items-center">
                <p className="text-xs  font-semibold">In/del</p>
                <p className="text-xs  text-green-500">+500</p>
                <p className="text-xs text-red-500">-290</p>
            </div>
            <div className="flex flex-col items-center gap-y-1">
                <p className="text-xs font-bold">%</p>
                <p className="text-xs ">80 %</p>
                <div className="h-4"></div>
            </div>
            
            
          </div>
          <Separator className="my-2"/>
          <div className="flex flex-row items-center gap-2 pl-2 ">
            <Avatar
              className="h-10 w-10 border-2 border-muted "
            >
              <AvatarImage src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <p className="text-xs ">Luca Delmastro</p>
            <div className="flex flex-col gap-y-1 items-center">
                <p className="text-xs  font-semibold">In/del</p>
                <p className="text-xs  text-green-500">+500</p>
                <p className="text-xs text-red-500">-290</p>
            </div>
            <div className="flex flex-col items-center gap-y-1">
                <p className="text-xs font-bold">%</p>
                <p className="text-xs ">80 %</p>
                <div className="h-4"></div>
            </div>
            
            
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
}
