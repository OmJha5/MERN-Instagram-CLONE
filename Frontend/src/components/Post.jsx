import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {FaHeart , FaRegHeart} from "react-icons/fa";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input';
import CommentDialog from './CommentDialog';

export default function Post() {
    let [isCommentText , setCommentText] = useState("");
    let [isTypingText , setIsTypingText] = useState(false);
    let [isOpen , setIsOpen] = useState(false);

    let checkShowPostOrNot = (e) => {
        let s = e.target.value;
        s.trim();

        if(s.length > 0) {
            setCommentText(s);
            setIsTypingText(true)
        }
        else {
            setCommentText("");
            setIsTypingText(false)
        }
    }

    return (
        <div className='flex flex-col my-8 w-fit'>
            <div className="flex items-center justify-between my-2">
                <div className='flex gap-2'>
                    <Avatar className='w-6 h-6'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="font-bold">Username</span>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger> <MoreHorizontal/> </DialogTrigger>
                        <DialogContent>
                            <div>
                                <Button variant="outline" className="text-red-500 w-full">Unfollow</Button>
                                <Button variant="outline" className="w-full">All To Favourites</Button>
                                <Button variant="outline" className="text-red-500 w-full">Delete</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div>
                <img src="https://images.unsplash.com/photo-1738471743329-b50393cf6319?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-[25vw] rounded-md aspect-square object-fit" alt="" />
            </div>

            <div className='flex my-2 justify-between items-center '>
                <div className='flex gap-2 items-center'>
                    <FaRegHeart size={"23px"} className='cursor-pointer hover:text-gray-600 '/>
                    <MessageCircle className='cursor-pointer mx-2 hover:text-gray-600' onClick={() => setIsOpen(true)}/>
                    <Send className='cursor-pointer hover:text-gray-600 '/>
                </div>
                <Bookmark className='cursor-pointer hover:text-gray-600 '/>
            </div>

            <div>
                <span className='font-medium block text-sm'>1k likes</span>
                <div className='flex flex-col my-2'>
                    <span className='font-bold text-sm'>Username</span>
                    <span className='font-normal text-sm'>Caption</span>
                </div>
                <span className="font-normal block text-sm text-gray-500 cursor-pointer" onClick={() => setIsOpen(true)}>View all 10 comments</span>
            </div>

            <CommentDialog isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className=" relative my-3">
                <input value={isCommentText} onChange={checkShowPostOrNot} type="text" className="w-full pr-[70px] p-2 outline-none" placeholder="Add a comment.."  />
                {
                    (isTypingText) ? (
                        <Button variant="ghost" className="text-blue-600 absolute right-0 h-[90%]" >Post</Button>
                    ) : ( "")
                }
            </div>

            <hr />
        </div>
        
    )
}
