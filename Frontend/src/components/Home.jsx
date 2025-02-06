import React from 'react'
import LeftSidebar from './LeftSidebar'
import Posts from './Posts'
import useGetAllPost from '@/hooks/useGetAllPosts';

export default function Home() {
  useGetAllPost();

  return (
    <div>
        <LeftSidebar/>
        <div className="flex-1 pl-[20vw]">
            <Posts/>
        </div>
        
    </div>
  )
}
