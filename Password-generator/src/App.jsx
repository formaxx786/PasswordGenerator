import { useState,useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'



function App() {

  
  const [length,setLength]=useState(8)
  const [Nallowed,SetNallowed]=useState(false)
  const [Callowed,SetCallowed]=useState(false)
  const [Password,SetPassword]=useState('')

  // useCallback Hook
  const PasswordGenerator=useCallback(()=>{
    let pass="";
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (Nallowed) str+='0123456789';
    if(Callowed) str+='!@#$%^&*?';
  
    for (let i = 1; i <= length; i++) {
      let c=Math.floor(Math.random()*str.length)
      // pass += str.charAt(c)
      pass+=str[c]
    }
    // console.log(pass);
    
    SetPassword(pass)
  },[length,Nallowed,Callowed,SetPassword])

   //useRef Hook
   const passRef=useRef(null)
  const copyPassword=useCallback(()=>{
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(Password)
  },[Password])


  //useEffect Hook
  useEffect(()=>{
    PasswordGenerator()
  },[length,Nallowed,Callowed,PasswordGenerator])

 

  
  return (
    <>
    <div className='w-full max-w-md mx-auto mt-60 shadow-md rounded-lg px-4 py-3 my-8  bg-slate-400'>
      <h1 className='text-white text-center text-2xl'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 my-2'>
<input type="text" 
         value={Password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passRef}/>
        <button className='bg-blue-500 w-14' onClick={copyPassword}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'></div>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={8} max={32} value={length} className='cursor-pointer' onChange={(x)=>{setLength(x.target.value)}}/>
        <label>Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={Nallowed} id='numberinput' onChange={()=>{SetNallowed((prev)=>!prev)}} />
        <label htmlFor="numberinput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={Callowed} id='characterinput' onChange={()=>{SetCallowed((prev)=>!prev)}} />
        <label htmlFor="characterinput">Characters</label>
      </div>
    </div>
    </>
  )


}

export default App
