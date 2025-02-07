import React from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import Posts from './Posts'
import useGetAllPost from '@/hooks/useGetAllPosts';
import useGetAllSuggestedUsers from '@/hooks/useGetAllSuggestedUsers';

export default function Home() {
  useGetAllPost();
  useGetAllSuggestedUsers();

  return (
    <div className='flex '>
        <LeftSidebar/>
        <div className="flex-1 pl-[20vw]">
            <Posts/>
        </div>
        <RightSidebar/>
        
    </div>
  )
}
