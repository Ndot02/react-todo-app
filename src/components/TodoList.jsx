import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodos,
  editTask,
  setSearchFilter,
  setStatusFilter,
  toggleComplete,
} from "../features/todo/todoSlice";

const TodoList = () => {
  const { todos, filter } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);
  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };
  const handleEditSave = (id) => {
    if (editText.trim()) {
      dispatch(editTask({ id, newText: editText.trim() }));
      setEditId(null);
      setEditText("");
    }
  };
  const filteredTodo=todos.filter(todo=>{
      if (filter.status==='completed')  return todo.completed;
       if (filter.status==='pending')  return !todo.completed;
       return true
    }).filter(task=>task.text.toLowerCase().includes(filter.search.toLowerCase()))
  return (
    <div className="">
      <input
        type="text"
        placeholder="Search tasks"
        value={filter.search}
        onChange={(e) => dispatch(setSearchFilter(e.target.value))}
        className="w-full p-2 border rounded mb-4  "
      />
      <div className="flex gap-4 mb-4">
         { ['all','completed','pending'].map((status)=>(<button key={status}className={`border rounded ${filter.status === status ? 'bg-blue-500 text-white' : 'bg-white'} p-2`} onClick={()=>dispatch(setStatusFilter(status))}>{status.charAt(0).toUpperCase()+status.slice(1)}</button>))
}
      </div>
      <ul className="space-y-2">
        {filteredTodo.length === 0 && <p>No todos found</p>}
        {filteredTodo.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border rounded-md p-2 mt-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => dispatch(toggleComplete(todo.id))}
                className="border rounded px-2"
              />
              {editId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                ></input>
              ) : (
                <span
                  className={
                    todo.completed
                      ? "line-through text-gray-500 cursor-pointer"
                      : ""
                  }
                >
                  {todo.text}
                </span>
              )}
              <div className="flex  gap-2 ml-4  ">
                {editId === todo.id ? (
                  <button
                    className="text-green-500 hover:underline cursor-pointer"
                    onClick={() => handleEditSave(todo.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => handleEdit(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => dispatch(deleteTodos(todo.id))}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
