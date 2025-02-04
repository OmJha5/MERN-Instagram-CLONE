import React from 'react'
import Post from './post'

export default function Posts() {
  return (
    <div className='flex flex-col items-center'>
        {
            [1,2,3,4,5].map((elm , ind) => {
                return <Post key={ind} />
            })
        }
    </div>
  )
}
