import { createSlice } from "@reduxjs/toolkit";
const loadTodoFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("demoTodos");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};
const saveTodoFromLocalStorage = (todos) => {
  localStorage.setItem("demoTodos", JSON.stringify(todos));
};
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: loadTodoFromLocalStorage(),
    filter: {
      status: "all",
      search: "",
    },
  },
  reducers: {
    addTodos: (state, action) => {
      state.todos.push(action.payload);
      saveTodoFromLocalStorage(state.todos);
    },
    deleteTodos: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodoFromLocalStorage(state.todos);
    },
    toggleComplete:(state,action)=>{
        const todo=state.todos.find(t=>t.id=== action.payload)
        if(todo) todo.completed=!todo.completed;
        saveTodoFromLocalStorage(state.todos)
    },
    editTask:(state,action)=>{
        const {id,newText}=action.payload;
        const todo=state.todos.find(t=>t.id===id);
        if(todo) todo.text=newText
        saveTodoFromLocalStorage(state.todos)
    },
    setStatusFilter:(state,action)=>{
        state.filter.status=action.payload
    },
    setSearchFilter:(state,action)=>{
      state.filter.search=action.payload
    }
  },
});

export const {addTodos,deleteTodos,toggleComplete,editTask,setStatusFilter,setSearchFilter}=todoSlice.actions
export default todoSlice.reducer