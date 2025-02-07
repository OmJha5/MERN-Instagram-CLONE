import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'react-router-dom';

export default function SuggestedUsers() {
    let { allSuggestedUsers } = useSelector((state) => state.auth);

    return (
        <div className='my-5'>
            <div className="flex justify-between mb-5">
                <span className="font-normal text-sm text-gray-600">Suggested For you</span>
                <span className="font-medium text-sm">See All</span>
            </div>

            {
                allSuggestedUsers?.map((user) => (
                    <div key={user._id}>
                        <div className="flex justify-between gap-12 my-3">
                            <div className="flex gap-5 items-center">
                                <Link to={`${user._id}/profile`}>
                                    <Avatar className='w-6 h-6 cursor-pointer'>
                                        <AvatarImage src={user.profilePhoto} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>

                                <div className='flex flex-col'>
                                    <span className="font-semibold">{user.username}</span>
                                    <span className='font-normal text-sm'>{user.bio}</span>
                                </div>
                            </div>

                            <div>
                                <span className='cursor-pointer text-blue-500'>Follow</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
