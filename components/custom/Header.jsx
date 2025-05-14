import React, { useEffect } from 'react'
import { googleLogout } from '@react-oauth/google'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'
import { useGoogleLogin } from '@react-oauth/google'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Link } from 'react-router-dom'

const cache=new Map();
const Header = () => {
  const [dialog, setdialog] = React.useState(false)
  const [userpic, setuserpic] = React.useState('')
  const user=JSON.parse(localStorage.getItem('user'))
  useEffect(()=>{
    if(user){
    
      
      if(cache.has(user.email)){
        setuserpic(cache.get(user.email))
        return;
      }
      setuserpic(user?.picture)
      cache.set(user?.email,user?.picture)
    }
  },[user])
   const login= useGoogleLogin({
    onSuccess:(codeResponse) => GetuserProfile(codeResponse),
    onError:(error) => console.log(error),
  })
    const GetuserProfile=async(tokeninfo)=>{
    try {
    
      
      const data=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,{
        headers:{
          Authorization: `Bearer ${tokeninfo?.access_token}`,
          Accept: "application/json",
        }
      })
     console.log(data);
     
      setdialog(false);
      localStorage.setItem("user", JSON.stringify(data?.data));
      
    
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <div className='p-2 shadow-sm flex items-center justify-between'>
       <Link to={'/'}> <img src="/logo.svg" alt="logo" className='h-15' /></Link>
        <div>
          {
            user?<div className='flex items-center gap-5 pr-5'>
              <Link to={'/create-trip'}><Button variant="outline" className='cursor-pointer rounded-full'> +Create Trip</Button></Link>
              <Link to={'/my-trips'}><Button variant="outline" className='cursor-pointer rounded-full'>My Trips</Button></Link>
              <Popover>
              <PopoverTrigger><img  src={userpic} className='h-[50px] w-[50px] rounded-full cursor-pointer' alt="" /></PopoverTrigger>
  <PopoverContent><h1 onClick={()=>{
    googleLogout()
    localStorage.removeItem('user')
    window.location.reload()
  }} className='cursor-pointer'>logout</h1></PopoverContent>
</Popover>

            </div>:<Button className={'cursor-pointer'} onClick={()=>{
              setdialog(true);
            }} >Sign In</Button>
          }
            
        </div>
        <Dialog open={dialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className="h-15" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication </p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center"> 
                <FcGoogle className="h-7 w-7" />
                Sign In With Google  </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header