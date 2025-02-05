import React, { useState } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '../../endpoint.js'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'

export default function Signup() {
  let [loading , setLoading] = useState(false)
  let [input , setInput] = useState({
      email : "",
      password : ""

  })
  let navigate = useNavigate();
  let dipatch = useDispatch();

  let changeHandler = (e) => {
      setInput({...input , [e.target.name] : e.target.value});
  }

  let submitHandler = async(e) => {
      e.preventDefault()

      try{
          setLoading(true);
          let res = await axios.post(`${USER_API_ENDPOINT}/login` , input , {
              headers : {
                "Content-Type" : "application/json"
              },

              withCredentials: true
          })

          if(res.data.success){
            dipatch(setAuthUser(res.data.user));
              navigate("/")
              toast.success(res.data.message);
              setInput({
                  email: "",
                  password: ""
              });
          }
      }
      catch(e){
          console.log(e);
          toast.error(e?.response?.data?.message);
      }
      finally{
          setLoading(false)
      }

  }

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <form onSubmit={submitHandler} className="shadow-lg flex flex-col gap-5 p-8">
            <div className="my-4">
                <h1 className='text-center font-bold text-xl my-2'>LOGO</h1>
                <p className=' text-gray-500'>Login to see photos & videos from your friends</p>
            </div>
            <div>
                <Label htmlFor='email' >Email</Label>
                <Input type="email" placeholder="Enter your email" id="email" name="email" className="my-2" value={input.email} onChange={changeHandler} />
            </div>
            <div>
                <Label htmlFor='password' >Password</Label>
                <Input type="password" placeholder="Enter the password" id="password" name="password" className="my-2" value={input.password} onChange={changeHandler} />
            </div>

            {
              (loading) ? (
                  <Button type="submit"> <Loader2 className='w-4 h-4 animate-spin' /> <span className="ml-1">Please wait..</span> </Button>
              ) : (
                <Button type="submit">Login</Button>
              )
            }

            <p className="my-2 text-sm">Don't have an account ? <span className='text-blue-600'><Link to="/signup">Signup</Link></span></p>
        </form>
    </div>
  )
}
