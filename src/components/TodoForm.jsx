import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodos } from '../features/todo/todoSlice'
import { nanoid } from 'nanoid'

const TodoForm = () => {
    const [inputValue,setInputValue]=useState('')
    const dispatch=useDispatch()
    const handleSubmit=(e)=>{
      e.preventDefault();
      if (inputValue.trim()==='')return
      dispatch(addTodos({
        id:nanoid(),
        text:inputValue.trim(),
        completed:false
      }))
setInputValue('')
    }
  return (
   <form action="" className='flex space-x-2 items-center mb-5' onSubmit={handleSubmit}>
    <input type="text" placeholder='Add new task' className='p-2 border-2 rounded-md' value={inputValue} onChange={e=>setInputValue(e.target.value)} />
    <button className='bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-600'>Add Task</button>
   </form>
  )
}

export default TodoForm