import React from "react";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, title: string, description: string) => Promise<void>;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) {
  return (
    <ul className="space-y-4 w-full max-w-2xl mx-auto mt-8">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded shadow"
        >
          <div className="flex-1">
            <h3
              className={`text-lg font-semibold ${
                todo.status === "done" ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </h3>
            <p className="text-gray-600">{todo.description}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                todo.status === "done"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {todo.status}
            </span>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <form action={onToggle.bind(null, todo.id)}>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Toggle
              </button>
            </form>
            <form action={onDelete.bind(null, todo.id)}>
              <button
                type="submit"
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </form>
            {/* Edit functionality can be added here as a modal or inline form */}
          </div>
        </li>
      ))}
    </ul>
  );
}
