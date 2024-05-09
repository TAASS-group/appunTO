import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function page() {

  const getPreviewText = (text: string, length: number): string => {
    if (text.length > length) {
        return text.substring(0, length) + '...';
    }
    return text;
  };

  const text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient';


  return (
    <div >
      
      <h1 className= 'text-4xl font-semibold leading-none tracking-tight text-center pt-12 pb-20' >
        Forum intelligenza artificiale laboratorio
      </h1>

      <div className='flex flex-col space-y-4'>
      
      <Card>
      <CardHeader className='pl-5'>
        <CardTitle>Nuovelle AI vs cognitivismo</CardTitle>
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
          excepturi quia aut qui animi nobis explicabo veniam rem assumenda
          temporibus. Recusandae id distinctio obcaecati eaque ad cupiditate
          velit suscipit autem? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quia odit quas eos blanditiis cumque? Corrupti quasi
          officia odit veniam id quos ipsum atque maiores debitis. Quos quod qui
          corrupti eligendi.
        </p>
      </CardContent>
      
    <CardFooter className='flex justify-end pb-1'>
      <Button variant='link'>View</Button>
    </CardFooter>
    </Card>
    
    <Card>
      <CardHeader className='pl-5'>
        <CardTitle>Nuovelle AI vs cognitivismo</CardTitle>
      </CardHeader>
      <div className="flex h-6 items-center ">
      <Avatar className='ml-4'>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <Separator className='ml-2 h-9' orientation="vertical" />
      <CardContent className='items-center text-sm py-0 truncate'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient</p>
      </CardContent>
      
      </div>
      
    <CardFooter className='flex justify-end pb-1'>
      <Button variant='link'>View</Button>
    </CardFooter>
    </Card>
    
    <Card>
      <CardHeader className='pl-5'>
        <CardTitle>Nuovelle AI vs cognitivismo</CardTitle>
      </CardHeader>
      <div className="flex h-6 items-center ">
      <Avatar className='ml-4'>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <Separator className='ml-2 h-9' orientation="vertical" />
      <CardContent className='items-center text-sm py-0 truncate'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient</p>
      </CardContent>
      
      </div>
      
    <CardFooter className='flex justify-end pb-1'>
      <Button variant='link'>View</Button>
    </CardFooter>
    </Card>
    
    <Card>
      <CardHeader className='pl-5'>
        <CardTitle>Nuovelle AI vs cognitivismo</CardTitle>
      </CardHeader>
      <div className="flex h-6 items-center ">
      <Avatar className='ml-4'>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <Separator className='ml-2 h-9' orientation="vertical" />
      <CardContent className='items-center text-sm py-0 truncate'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient</p>
      </CardContent>
      
      </div>
      
    <CardFooter className='flex justify-end pb-1'>
      <Button variant='link'>View</Button>
    </CardFooter>
    </Card>
    
    <Card>
      <CardHeader className='pl-5'>
        <CardTitle>Nuovelle AI vs cognitivismo</CardTitle>
      </CardHeader>
      <div className="flex h-6 items-center ">
      <Avatar className='ml-4'>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <Separator className='ml-2 h-9' orientation="vertical" />
      <CardContent className='items-center text-sm py-0 truncate'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient</p>
      </CardContent>
      
      </div>
      
    <CardFooter className='flex justify-end pb-1'>
      <Button variant='link'>View</Button>
    </CardFooter>
    </Card>
    
    <Card>
      <CardHeader className='pl-5'>
        <CardTitle>Nuovelle AI vs cognitivismo</CardTitle>
      </CardHeader>
      <div className="flex h-6 items-center ">
      <Avatar className='ml-4'>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <Separator className='ml-2 h-9' orientation="vertical" />
      <CardContent className='items-center text-sm py-0 truncate'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient</p>
      </CardContent>
      
      </div>
      
    <CardFooter className='flex justify-end pb-1'>
      <Button variant='link'>View</Button>
    </CardFooter>
    </Card>
    
    <Card>
      <CardHeader className='pl-5'>
        <CardTitle>Nuovelle AI vs cognitivismo</CardTitle>
      </CardHeader>
      <div className="flex h-6 items-center ">
      <Avatar className='ml-4'>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <Separator className='ml-2 h-9' orientation="vertical" />
      <CardContent className='items-center text-sm py-0 truncate'>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mattis neque. Orci varius natoque penatibus et magnis dis parturient</p>
      </CardContent>
      
      </div>
      
    <CardFooter className='flex justify-end pb-1'>
      <Button variant='link'>View</Button>
    </CardFooter>
    </Card>
        
      </div>
    </div>
    
  )
}

export default page