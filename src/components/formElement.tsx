import { FormEvent, useRef, useState } from "react";
import { Todo } from "../interfase";

function FormElement() {
  let [todos, setTodos] = useState<Todo[]>([]);
  let titleref = useRef<HTMLInputElement>(null);
  let descref = useRef<HTMLInputElement>(null);
  let compref = useRef<HTMLInputElement>(null);
  let typeref = useRef<HTMLSelectElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();

    let todo: Todo = {
      completed: compref.current?.checked || false,
      description: descref.current?.value || "",
      title: titleref.current?.value || "",
      type: (typeref.current?.value as "hard" | "normal" | "easy") || "hard",
      id: Math.trunc(Math.random() * 1000),
    };

    console.log(todo);

    setTodos((prev: Todo[]) => {
      return [...prev, todo];
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4 border-2 border-gray-200">
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
            type="text"
            ref={descref}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            ref={compref}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label className="text-gray-700">Complete</label>
        </div>

        <div>
          <select
            name="type"
            ref={typeref}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="hard">hard</option>
            <option value="normal">normal</option>
            <option value="easy">easy</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          click
        </button>
      </form>
    </div>
  );
}

export default FormElement;
