import useGetUserProfile from '@/hooks/useGetUserProfile';
import React from 'react'
import { useParams } from 'react-router-dom'
import LeftSidebar from './LeftSidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from 'react-redux';
import { Button } from './ui/button';

export default function Profile() {
    let params = useParams();
    let userId = params.id;
    useGetUserProfile(userId);

    let { userProfile } = useSelector((state) => state.auth);
    let isFollowing = false
    let isLoggedInUser = true;

    return (
        <div className=''>
            <LeftSidebar />

            <div className='pl-[20vw] max-w-7xl mx-auto my-10'>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 items-center">
                        <Avatar className='w-32 h-32 mx-auto  '>
                            <AvatarImage src={userProfile.profilePhoto} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>


                        <div className="flex gap-5 flex-col">
                            <div className="flex gap-2 items-center">
                                <span className="font-semibold mr-5">{userProfile.username}</span>
                                {
                                    (isLoggedInUser) ? (
                                        <div className="flex gap-2">
                                            <Button variant="secondary">Edit Profile</Button>
                                            <Button variant="secondary">View Archive</Button>
                                            <Button variant="secondary">AI Tools</Button>
                                        </div>
                                    ) : (

                                        (isFollowing) ? (
                                            <Button className="bg-blue-600 w-fit hover:bg-blue-500 cursor-pointer" >Follow </Button>
                                        ) : (
                                            <Button className="bg-blue-600 w-fit hover:bg-blue-500 cursor-pointer" >UnFollow </Button>
                                        )
                                    )
                                }
                            </div>

                            <div className="flex gap-10">
                                <p><span className='font-bold pr-1'>{userProfile?.posts?.length}</span>Posts</p>
                                <p><span className='font-bold pr-1'>{userProfile?.posts?.length}</span>Followers</p>
                                <p><span className='font-bold pr-1'>{userProfile?.posts?.length}</span>Following</p>
                            </div>

                            <div>
                                <span className='font-semibold'>I am Full Stack Developer</span>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <span >Learn Code with Om Kumar Jha</span>
                                <span >Making Coding Fun</span>
                                <span >DM for Collaboration</span>
                            </div>
                        </div>

                    </div>

                    <hr className='my-5' />


                </div>
            </div>


        </div>
    )
}
