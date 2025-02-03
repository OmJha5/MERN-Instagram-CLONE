import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import { USER_API_ENDPOINT } from '../../endpoint.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'

const sidebarItems = [
  { icon: <Home />, text: "Home" },
  { icon: <Search />, text: "Search" },
  { icon: <TrendingUp />, text: "Explore" },
  { icon: <MessageCircle />, text: "Messages" },
  { icon: <Heart />, text: "Notifications" },
  { icon: <PlusSquare />, text: "Create" },
  {
    icon: (
      <Avatar className='w-6 h-6'>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile"
  },
  { icon: <LogOut />, text: "Logout" },
]


export default function LeftSidebar() {
  let navigate = useNavigate();

  let handleLogOut = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  
  let handleClick = (type) => {
    if (type == "Logout") handleLogOut();
  }

  
  return (
    <div className="fixed top-0 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col items-center">
        <img src="https://img.freepik.com/premium-vector/instagram-logo-vector-illustration_1300495-24.jpg?semt=ais_hybrid" alt="" className="my-3 w-[30%] cursor-pointer" />
      </div>

      <div className="flex flex-col gap-3">
        {
          sidebarItems.map((item , ind) => {
            return (
              <div key={ind} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg p-3" onClick={(() => handleClick(item.text))}>
                <span>{item.icon}</span> <span className='left-2'>{item.text}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
