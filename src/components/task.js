import React from 'react'
import '../App.css'

import { InputContext } from '../App'
import { useContext,useState } from 'react'

function Task({content,index}) {
  const {account,todos,setTodos,edit,remove} = useContext(InputContext)
  const [edits,setEdits] = useState(false) ;
  const [input,setInput] = useState(content)
  return (
    <div className='task'>
        {
          edits ? <input type='text' value={input} onChange={(e)=>setInput(e.target.value)}/> : <p>{content}</p>
        }
        <button 
          type='button'
          onClick={async(e)=>{
            await remove(account,index)
            let tmp = [...todos].filter(function(val){return val!==content})
            console.log(tmp)
            setTodos(tmp)
          }}
          className='action-btn'
        >
          Finish
        </button>
        <button onClick={async()=>{
          if(edits===true && input!==content)await edit(account,input,index)
          setEdits(!edits)
          let tmp = [...todos]
          for(let i=0;i<todos.length;i++){
            if(tmp[i]===content)tmp[i] = input;
          }
          setTodos(tmp)
          content = input
          }}
           className='action-btn'
          >
          Edit
        </button>
    </div>
  )
}

export default Task