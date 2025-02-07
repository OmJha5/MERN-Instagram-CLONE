import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from 'react'

export default function Comment({comment}) {
    return (
        <div>
            <div className='flex gap-2'>
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={comment?.author?.profilePhoto} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-bold">{comment.author.username}</span>
                <span>{comment.text}</span>
            </div>
        </div>
    )
}
