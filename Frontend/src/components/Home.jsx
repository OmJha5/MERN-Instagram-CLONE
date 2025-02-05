import React from 'react'
import LeftSidebar from './LeftSidebar'
import Posts from './Posts'

export default function Home() {
  return (
    <div>
        <LeftSidebar/>
        <div className="flex-1 pl-[20vw]">
            <Posts/>
        </div>
        
    </div>
  )
}
