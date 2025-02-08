import useGetUserProfile from '@/hooks/useGetUserProfile';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LeftSidebar from './LeftSidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Heart, MessageCircle } from 'lucide-react';

export default function Profile() {
    let params = useParams();
    let userId = params.id;
    useGetUserProfile(userId);
    let [focused, setFocused] = useState("posts");

    let { userProfile } = useSelector((state) => state.auth);
    let { user } = useSelector((state) => state.auth);
    let isFollowing = false
    let isLoggedInUser = user._id == userProfile._id;
    let allPosts = (focused == "posts") ? userProfile?.posts : userProfile?.bookmarks
    let navigate = useNavigate();

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
                                            <Button variant="secondary" onClick={() => navigate(`/${userProfile._id}/edit`)}>Edit Profile</Button>
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
                                <span className='font-semibold'>{userProfile?.bio}</span>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <span >Learn Code with Om Kumar Jha</span>
                                <span >Making Coding Fun</span>
                                <span >DM for Collaboration</span>
                            </div>
                        </div>

                    </div>

                    <hr className='my-10' />

                    <div>
                        <div className="flex gap-20 justify-center">
                            <span className={`text-sm cursor-pointer ${focused == "posts" ? "font-bold" : ""}`} onClick={(e) => setFocused("posts")}>Posts</span>
                            <span className={`text-sm cursor-pointer ${focused == "saved" ? "font-bold" : ""}`} onClick={(e) => setFocused("saved")}>Saved</span>
                            <span className={`text-sm cursor-pointer`} onClick={(e) => setFocused("reels")}>Reels</span>
                            <span className={`text-sm cursor-pointer`} onClick={(e) => setFocused("tabs")}>Tabs</span>

                        </div>

                        <div className="grid grid-cols-3 gap-1 mt-5">
                            {
                                allPosts.map((post) => (
                                    <div key={post._id} className='relative cursor-pointer flex justify-center items-center group'>
                                        <img src={post.image} alt="PostImage" className='rounded-sm my-2 aspect-square' />

                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-1000"></div>

                                        <div className='flex gap-2 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1000'>
                                            <button>
                                                <Heart />
                                                <span>{post?.likes?.length}</span>
                                            </button>

                                            <button>
                                                <MessageCircle />
                                                <span>{post?.comments?.length}</span>
                                            </button>
                                        </div>
                                    </div>



                                ))
                            }
                        </div>

                    </div>

                </div>
            </div>


        </div>
    )
}
