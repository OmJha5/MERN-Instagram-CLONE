import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useRef, useState } from 'react'
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { readFileAsDataURL } from "@/lib/readFileAsDataURL";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { POST_API_ENDPOINT } from '../../endpoint.js'
import { setAllPosts } from "@/redux/postSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CreatePost({ open, setOpen }) {
    let inputRef = useRef();
    let [file , setFile] = useState("");
    let [caption , setCaption] = useState("");
    let [imagePreview , setImagePreview] = useState("");
    let [loading , setLoading] = useState(false);
    let {allPosts} = useSelector((state) => state.post);
    let dispatch = useDispatch();
    let {user} = useSelector((state) => state.auth);

    let fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if(file){
            setFile(file);
            const dataUrl = await readFileAsDataURL(file);
            setImagePreview(dataUrl);
        }
    }

    let onPostHandler = async() => {
        try{
            setLoading(true);
            let formData = new FormData();
            formData.append("caption" , caption);
            if(imagePreview) formData.append("profilePhoto" , file);

            const res = await axios.post(`${POST_API_ENDPOINT}/addpost` , formData , {
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials : true
            });

            if(res.data.success){
                toast.success(res.data.message);
                setOpen(false)
                dispatch(setAllPosts([res.data.post , ...allPosts]));
                setFile("")
                setImagePreview("");
                setCaption("");
            }
        }
        catch(e){
            console.log(e);
            toast(e?.response?.data?.message)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent onInteractOutside={() => setOpen(false)} >
                    <DialogHeader className="!text-center font-semibold">
                        <DialogTitle>Create New Post</DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-3 items center">
                        <Avatar className='w-6 h-6 self-center'>
                            <AvatarImage src={user?.profilePhoto} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div>
                            <h1 className="font-semibold text-xs">{user?.username}</h1>
                            <span className="text-gray-600 text-sx">{user?.bio}</span>
                        </div>
                    </div>

                    <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption..."></Textarea>

                    {
                        imagePreview && (
                            <div className="max-h-96">
                                <img src={imagePreview} alt="preview_image" className="w-full h-full object-cover" />
                            </div>
                        )
                    }

                    <input ref={inputRef} type="file" name="" id="" className="hidden" onChange={fileChangeHandler} />
                    <Button onClick={() => inputRef.current.click()} className="bg-[#0095F6] mt-5 hover:bg-[#258bcf] w-fit" >Select From Computer</Button>

                    {
                        imagePreview && (
                            (loading) ? (
                                <Button type="submit"> <Loader2 className='w-4 h-4 animate-spin' /> <span className="ml-1">Please wait..</span> </Button>
                            ) : (
                                <Button onClick={onPostHandler} >Post</Button>
                            )
                        )
                    }
                </DialogContent>
            </Dialog>
        </div>
    )
}
