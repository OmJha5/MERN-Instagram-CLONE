import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from 'react-redux'
import SuggestedUsers from "./SuggestedUsers";
import { Link } from 'react-router-dom';

export default function RightSidebar() {
    let {user} = useSelector((state) => state.auth);

    return (
        <div className='my-10 pr-16'>
            <div className="flex gap-7 items-center">
                <Link to={`${user._id}/profile`}>
                    <Avatar className='w-6 h-6 cursor-pointer'>
                    <AvatarImage src={user.profilePhoto}  alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </Link>

                <div className='flex flex-col'>
                    <span className="font-bold">{user.username}</span>
                    <span className='font-normal text-sm'>{user.bio}</span>
                </div>
            </div>

            <SuggestedUsers />
        </div>
    )
}
