import { HERO_CONTENT } from "../constants"
import profilePic from "../assets/kevinRushProfile.jpg"
import {motion} from "framer-motion"
import { useState,useEffect } from "react"
const container =(delay) => ({
  hidden: {x: -100, opacity: 0},
  visible: {
    x:0,
    opacity: 1,
    transition: {duration: 0.5, delay: delay}
  }
})
const Hero = () => {
const [loopNum, setLoopNum] = useState(0);
const [isDeleting,setIsDeleting] = useState(false);
const toRotate = ["Web Developer", "Coder", "Software Engineer"];
const [text,setText] = useState('');
const [delta,setDelta] = useState(200-Math.random() * 100);
const period = 1700;

useEffect(()=>{
  let ticker = setInterval(() =>{
    tick();
  }, delta)

  return () =>{clearInterval(ticker)};
}, [text])

  const tick = () =>{
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0,text.length +1);

    setText(updatedText);

    if(isDeleting) {
      setDelta(prevDelta => prevDelta /2)
    }
    if(!isDeleting && updatedText== fullText){
      setIsDeleting(true);
      setDelta(period);
    } else if(isDeleting && updatedText==''){
      setIsDeleting(false);
      setLoopNum(loopNum+1);
      setDelta(100);
    }
  }
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
        <div className="flex flex-col items-center lg:items-start ">
            <h1 
             className="pb-16 text-6xl font-thin tracking-tight lg:mt-16
            lg:text-8xl">Yuvraj Singh</h1>

            <span 
             variants={container(0.5)}
             initial="hidden"
             animate="visible"
            className="bg-gradient-to-r from-pink-300 via-slate-500
            to-purple-500 bg-clip-text text-4xl track-tight text-transparent">I'm a {text}<span className="font-bold text-slate-400">|</span>
            </span>

            <motion.p 
             variants={container(1)}
             initial="hidden"
             animate="visible"
             className="my-2 max-w-xl py-6 font-light  ">
                {HERO_CONTENT}
            </motion.p>
        </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
        <div className="flex justify-center">
            <motion.img 
            initial= {{x: 100, opacity: 0}}
            animate={{x:0,opacity: 1}}
            transition={{duration:1, delay:1.2}}
            src={profilePic} alt="Yuvraj singh" />
        </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
