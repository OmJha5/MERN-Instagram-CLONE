import React from 'react'
import {
    Dialog,
    DialogContent,

} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Input } from './ui/input'

export default function CommentDialog({ isOpen, setIsOpen }) {
    return (
        <div>
            <Dialog open={isOpen}>
                <DialogContent onInteractOutside={() => setIsOpen(false)} className="max-w-5xl p-0">
                    <div className="flex gap-10">
                        <div>
                            <img src="https://images.unsplash.com/photo-1738471743329-b50393cf6319?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-[30vw] rounded-tl-md rounded-bl-md aspect-square object-fit" alt="" />
                        </div>

                        <div className="flex-1 mr-7">
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

                            <hr />

                            <div className="flex flex-col gap-5 h-96 overflow-y-auto my-5">
                                Here Comments will come.
                            </div>

                            <div className="flex gap-3">
                                <Input placeholder="Post a Comment" />
                                <Button variant="ghost" >Post</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
