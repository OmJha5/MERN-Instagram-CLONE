import React, { useRef, useState } from 'react'
import LeftSidebar from './LeftSidebar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Textarea } from "@/components/ui/textarea"
import { USER_API_ENDPOINT } from '../../endpoint.js'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { setAuthUser } from '@/redux/authSlice';

export default function EditProfile() {
    let { userProfile , user } = useSelector((state) => state.auth);
    let [input, setInput] = useState({
        file: userProfile?.profilePhoto,
        bio: userProfile?.bio,
        gender: userProfile?.gender,
    })
    let imageRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [loading, setLoading] = useState(false);

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, file: file });
    }

    const editProfileHandler = async (e) => {
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if (input.file) formData.append("file", input.file);

        try {
            setLoading(true);
            let res = await axios.post(`${USER_API_ENDPOINT}/profile/edit`, formData , {
                headers : {
                    "Content-Type" : "multipart/form-data",
                },
                withCredentials : true
            })

            if(res.data.success){
                const updatedUserData = {
                    ...user,
                    bio:res.data.user?.bio,
                    profilePhoto:res.data.user?.profilePhoto,
                    gender:res.data.user.gender
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/${user?._id}/profile`);
                toast.success(res.data.message);
            }
        }
        catch (e) {
            console.log(e)
            toast.error(e?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <div className=''>
            <LeftSidebar />

            <div className='pl-[20vw] max-w-7xl mx-auto my-10'>
                <div className="flex flex-col gap-10">
                    <h2 className='font-bold text-xl'>Edit profile</h2>

                    <div className="flex justify-between p-4 bg-gray-200 rounded-md">
                        <div className="flex gap-5 items-cente">
                            <Link to={`/${userProfile._id}/profile`}>
                                <Avatar className='w-6 h-6 cursor-pointer'>
                                    <AvatarImage src={userProfile.profilePhoto} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </Link>

                            <div className='flex flex-col'>
                                <span className="font-bold">{userProfile.username}</span>
                                <span className='font-normal text-sm text-gray-500'>{userProfile.bio || "Bio Here"}</span>
                            </div>
                        </div>

                        <div>
                            <input ref={imageRef} type="file" onChange={fileChangeHandler} className='hidden' />
                            <Button onClick={() => imageRef?.current?.click()} className="bg-blue-600 hover:bg-blue-500">Change Photo</Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className='font-bold text-xl'>Bio</h2>
                        <Textarea placeholder="Enter your bio here.." rows="7" className="focus-visible:ring-transparent" value={input.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} />
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className='font-bold text-xl'>Gender</h2>

                        <Select defaultValue={input.gender || "male"} onValueChange={selectChangeHandler}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {
                        (loading) ? (
                            <Button> <Loader2 className='w-4 h-4 animate-spin' /> <span className="ml-1">Please wait..</span> </Button>
                        ) : (
                            <Button onClick={editProfileHandler} className="bg-blue-600 hover:bg-blue-500">Submit</Button>
                        )
                    }

                </div>
            </div>

        </div>
    )
}
