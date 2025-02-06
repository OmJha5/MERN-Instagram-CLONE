import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {FaRegHeart} from "react-icons/fa";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input';
import CommentDialog from './CommentDialog';
import { useSelector } from 'react-redux';

export default function Post({post}) {
    let [isCommentText , setCommentText] = useState("");
    let [isTypingText , setIsTypingText] = useState(false);
    let [isOpen , setIsOpen] = useState(false);
    let {user} = useSelector((state) => state.auth)

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
        <div className='flex flex-col my-8 w-1/3'>
            <div className="flex items-center justify-between my-2">
                <div className='flex gap-2'>
                    <Avatar className='w-6 h-6'>
                        <AvatarImage src={post.author.profilePhoto} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="font-bold">{post.author.username}</span>
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger> <MoreHorizontal/> </DialogTrigger>
                        <DialogContent>
                            <div>
                                <Button variant="outline" className="text-red-500 w-full">Unfollow</Button>
                                <Button variant="outline" className="w-full">All To Favourites</Button>
                                {
                                    post?.author?._id.toString() == user?._id.toString() &&  <Button variant="outline" className="text-red-500 w-full">Delete</Button>
                                }
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div>
                <img src={post.image}  alt="" className='w-full' />
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
                <span className='font-medium block text-sm'>{post.likes.length} likes</span>
                <div className='flex flex-col my-2'>
                    <span className='font-bold text-sm'>{post.author.username}</span>
                    <span>{post.caption}</span>
                </div>
                <span className="font-normal block text-sm text-gray-500 cursor-pointer" onClick={() => setIsOpen(true)}>View all {post.comments.length} comments</span>
            </div>

            <CommentDialog isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className=" relative my-3">
                <input value={isCommentText} onChange={checkShowPostOrNot} type="text" className="w-full pr-[70px] p-2 outline-none border border-[#f0ecec] rounded-md" placeholder="Add a comment.."  />
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
