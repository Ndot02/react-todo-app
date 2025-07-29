import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './index.css'

function App() {
  

  return (
    <div className='max-w-xl mx-auto p-8 dark:bg-
    ' >
      <h1 className='text-2xl font-bold mb-4 p-4'>Todo List</h1>
      <div><TodoForm/></div>
      <div><TodoList/></div>
    </div>
  )
}

export default App
