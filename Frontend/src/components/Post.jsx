import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {FaHeart, FaRegHeart} from "react-icons/fa";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input';
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import { POST_API_ENDPOINT } from '../../endpoint.js'
import axios from 'axios';
import { setAllPosts, setSelectedPost } from '@/redux/postSlice';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge"

export default function Post({post}) {
    let [isCommentText , setCommentText] = useState("");
    let [isTypingText , setIsTypingText] = useState(false);
    let [isOpen , setIsOpen] = useState(false);
    let {user} = useSelector((state) => state.auth)
    let {allPosts} = useSelector((state) => state.post);
    let dispatch = useDispatch();
    let [isLiked , setIsLiked] = useState(post?.likes.includes(user?._id));
    let [likedCount , setLikedCount] = useState(post?.likes?.length);
    let [allComments , setAllComments] = useState(post?.comments);

    let checkShowPostOrNot = (e) => {
        let s = e.target.value;
        let newString = s.trim();

        if(newString.length > 0) {
            setCommentText(s);
            setIsTypingText(true)
        }
        else {
            setCommentText(s);
            setIsTypingText(false)
        }
    }

    let commentPostHandler = async() => {
        try{
            let res = await axios.post(`${POST_API_ENDPOINT}/${post._id}/comment` , {text : isCommentText} , {
                headers : {
                    "Content-Type" : "application/json"
                },
                withCredentials : true
            })

            if(res.data.success){
                let updatedAllComments = [...allComments , res.data.comment];
                setAllComments(updatedAllComments);

                let updatedAllPosts = allPosts.map((p) => 
                    (p._id == post._id) ? {
                        ...p,
                        comments : updatedAllComments
                    } : p
                )

                dispatch(setAllPosts(updatedAllPosts));
                setCommentText("");
            }
        }
        catch(e){
            toast.error(e?.response?.data?.message);
        }
    }

    let likeDislikeHandler = async (e) => {
        let action = isLiked ? "dislike" : "like";
        try{
            let res = await axios.get(`${POST_API_ENDPOINT}/${post._id}/${action}` , {withCredentials : true});
            if(res.data.success){
                setLikedCount(isLiked ? likedCount - 1 : likedCount + 1);
                setIsLiked(!isLiked);

                let updatedAllPosts = allPosts.map((p) => 
                    (p._id == post._id) ? {
                        ...p ,
                        likes : (isLiked) ? p.likes.filter((id) => id != user._id) : [...p.likes , user._id] 
                    } : p
                    
                )

                dispatch(setAllPosts(updatedAllPosts));
            }

        }
        catch(e){
            toast.error(e?.response?.data?.message);
        }
    }

    let deletePostHandler = async() => {
        try{
            let res = await axios.delete(`${POST_API_ENDPOINT}/delete/${post?._id}` , {withCredentials : true});
            if(res.data.success){
                let filteredPost = allPosts.filter((p) => p?._id != post?._id);
                dispatch(setAllPosts(filteredPost));
                toast.success(res.data.message);
            }
        }
        catch(e){
            toast.error(e?.response?.data?.message);
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
                    { user._id == post.author._id && <Badge variant="secondary" className="cursor-pointer">Author</Badge> }
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger> <MoreHorizontal/> </DialogTrigger>
                        <DialogContent>
                            <div>
                                <Button variant="outline" className="text-red-500 w-full">Unfollow</Button>
                                <Button variant="outline" className="w-full">All To Favourites</Button>
                                {
                                    post?.author?._id.toString() == user?._id.toString() &&  <Button variant="outline" className="text-red-500 w-full" onClick={deletePostHandler}>Delete</Button>
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
                    
                    {
                        isLiked ? <FaHeart size={"23px"} className='cursor-pointer text-red-600 ' onClick={likeDislikeHandler} /> : <FaRegHeart size={"23px"} className='cursor-pointer hover:text-gray-600 ' onClick={likeDislikeHandler} />
                    }
                    <MessageCircle className='cursor-pointer mx-2 hover:text-gray-600' onClick={() => {
                        setIsOpen(true)
                        dispatch(setSelectedPost(post))
                    }}/>
                    <Send className='cursor-pointer hover:text-gray-600 '/>
                </div>
                <Bookmark className='cursor-pointer hover:text-gray-600 '/>
            </div>

            <div>
                <span className='font-medium block text-sm'>{likedCount} likes</span>
                <div className='flex flex-col my-2'>
                    <span className='font-bold text-sm'>{post.author.username}</span>
                    <span>{post.caption}</span>
                </div>
                {
                    allComments?.length > 0 && (
                        <span className="font-normal block text-sm text-gray-500 cursor-pointer" onClick={() => {
                            setIsOpen(true)
                            dispatch(setSelectedPost(post))
        
                        }}>View all {post.comments.length} comments</span>
                    )
                }
            </div>

            <CommentDialog isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className=" relative my-3">
                <input value={isCommentText} onChange={checkShowPostOrNot} type="text" className="w-full pr-[70px] text-sm p-2 outline-none border border-[#f0ecec] rounded-md" placeholder="Add a comment.."  />
                {
                    (isTypingText) ? (
                        <Button variant="ghost" className="text-blue-600 absolute right-0 h-[90%] cursor-pointer" onClick={commentPostHandler} >Post</Button>
                    ) : ( "")
                }
            </div>

            <hr />
        </div>
        
    )
}
