import error from "next/error";
import { todo } from "node:test";
import { type } from "os";
import input from "postcss/lib/input";
import { useState } from "react";
import { isError } from "util";
import { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from "./api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div>
        <input type="text" className="p-2 text-black" id="new-todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter new todo" />
      </div>
      <button className="p-2 border mt-5">upload</button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      //JSON.stringify(todos)
      return (
        <article key={todo.id} className="p-2 border ">
          <div className="todo ">
            <input type="checkbox" checked={todo.completed} id={todo.id} onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className="bg-red-600" onClick={() => deleteTodo({ id: todo.id })}>
            delete
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main className="w-full flex flex-col flex-column items-center justify-center text-center">
      <h1 className="text-[100px] p-5 ">Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
