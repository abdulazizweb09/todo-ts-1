import React, { useRef, useState } from "react";
import { Todo } from "../interfase";

function FormElement() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const titleref = useRef<HTMLInputElement>(null);
  const descref = useRef<HTMLInputElement>(null);
  const compref = useRef<HTMLInputElement>(null);
  const typeref = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleref.current?.value || "";
    const description = descref.current?.value || "";
    const completed = compref.current?.checked || false;
    const type =
      (typeref.current?.value as "hard" | "normal" | "easy") || "normal";

    if (!title || !description) {
      alert("malumotlarni toldiring");
      return;
    }
    let newTodo: Todo = {
      id: Math.floor(Math.random() * 1000),
      title,
      description,
      completed,
      type,
    };

    setTodos((prev) => [...prev, newTodo]);

    if (titleref.current) {
      titleref.current.value = "";
    }
    if (descref.current) {
      descref.current.value = "";
    }
    if (compref.current) {
      compref.current.checked = false;
    }
    if (typeref.current) {
      typeref.current.value = "normal";
    }
  };

  const handleDelete = (id: number) => {
    let exit = confirm("rostanham ochirmoqchimisiz?");
    if (exit) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4 border-2 border-gray-200"
      >
        <div>
          <input
            ref={titleref}
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <input
            ref={descref}
            type="text"
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={compref}
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label className="text-gray-700">Complete</label>
        </div>

        <div>
          <select
            ref={typeref}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="hard">Hard</option>
            <option value="normal">Normal</option>
            <option value="easy">Easy</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Todo
        </button>
      </form>

      <ul className="mt-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-200 p-4 my-2 rounded"
          >
            <div>
              <h3 className="text-xl">{todo.title}</h3>
              <p className="text-sm">{todo.description}</p>
              <p>{todo.completed ? "completed" : "net completed"}</p>
              <p>{todo.type} Task</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleDelete(todo.id)}
                className="cursor-pointer bg-blue-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormElement;
