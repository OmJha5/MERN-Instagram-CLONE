import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,

} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Input } from './ui/input'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import { POST_API_ENDPOINT } from '../../endpoint.js'
import { setAllPosts } from '@/redux/postSlice'
import { toast } from 'sonner'
import axios from 'axios'

export default function CommentDialog({ isOpen, setIsOpen }) {
    let dispatch = useDispatch();
    let { selectedPost , allPosts } = useSelector((state) => state.post);
    let {user} = useSelector((state) => state.auth)
    let [isCommentText , setCommentText] = useState("");
    let [allComments , setAllComments] = useState([]);

    useEffect(() => {
        setAllComments(selectedPost?.comments)
    } , [selectedPost])

    let commentPostHandler = async() => {
        try{
            let res = await axios.post(`${POST_API_ENDPOINT}/${selectedPost._id}/comment` , {text : isCommentText} , {
                headers : {
                    "Content-Type" : "application/json"
                },
                withCredentials : true
            })

            if(res.data.success){
                let updatedAllComments = [res.data.comment , ...allComments];
                setAllComments(updatedAllComments);

                let updatedAllPosts = allPosts?.map((p) => 
                    (p._id == selectedPost._id) ? {
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

    return (
        <div>
            <Dialog open={isOpen}>
                <DialogContent onInteractOutside={() => setIsOpen(false)} className="max-w-5xl p-0">
                    <div className="flex gap-10">
                        <div className='w-[60%]'>
                            <img src={selectedPost?.image} className='w-full h-full object-cover object-left-top' alt="" />
                        </div>

                        <div className="flex-1 mr-7 flex flex-col justify-evenly ">
                            <div className="flex items-center justify-between h-[10%]">
                                <div className='flex gap-2'>
                                    <Avatar className='w-6 h-6'>
                                        <AvatarImage src={selectedPost?.author?.profilePhoto} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="font-bold">{selectedPost?.author?.username}</span>
                                </div>
                                <div>
                                    <Dialog>
                                        <DialogTrigger> <MoreHorizontal /> </DialogTrigger>
                                        <DialogContent>
                                            <div>
                                                <Button variant="outline" className="text-red-500 w-full">Unfollow</Button>
                                                <Button variant="outline" className="w-full">All To Favourites</Button>
                                                {
                                                    selectedPost?.author?._id.toString() == user?._id.toString() && <Button variant="outline" className="text-red-500 w-full">Delete</Button>
                                                }
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            <hr />

                            <div className="flex flex-col gap-5 overflow-y-auto h-[70%]">
                                {
                                    allComments?.map((comment) => <Comment key={comment?._id} comment={comment} />)
                                }
                            </div>

                            <div className="flex gap-3">
                                <Input placeholder="Post a Comment" className="text-sm" onChange={(e) => setCommentText(e.target.value)} />
                                <Button variant="ghost" onClick={commentPostHandler} >Post</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
