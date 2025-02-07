import React from 'react'
import Post from './post'
import { useSelector } from 'react-redux'

export default function Posts() {
  let {allPosts} = useSelector((event) => event.post)
  return (
    <div className='flex flex-col items-center'>
        {
            allPosts?.map((post) => {
                return (post !== null) && <Post key={post?._id} post={post} />
            })

        }
    </div>
  )
}
