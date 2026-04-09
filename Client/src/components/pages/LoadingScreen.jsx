import {TextAnimate} from "../ui/text-animate"
import { useState,useEffect } from "react"
import {Progress} from "../ui/progress"

export const LoadingScreen = () => {
  const[value,setValue]=useState(20);
  useEffect(()=>{
    const interval=setInterval(()=>{
      setValue((prev)=>prev+10);
    },100);
    return ()=>clearInterval(interval);
  },[]);
  
  return (
    <div>
        <TextAnimate animation="blurIn" as="h1">
            SnapShare
        </TextAnimate>
        <Progress value={value} />
    </div>
  )
}
