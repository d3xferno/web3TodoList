import React, { useContext } from 'react'
import { InputContext } from '../App'

function TaskInput() {
  const {input,setInput,todos,setTodos,account,add} = useContext(InputContext)
  return (
    <div className='taskinput'>
        <input value={input} type='text' placeholder='Type something...' 
          onChange={(e)=>setInput(e.target.value)}
        />
        <button
          type='button'
          onClick={async(e)=>{
            await add(account,input)
            let tmp = [...todos,input]
            setTodos([...todos,input])
            console.log(tmp)
            setInput('')
          }}
          className='action-btn'
        >Add</button>
    </div>
  )
}

export default TaskInput