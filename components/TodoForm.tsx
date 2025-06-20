import React from "react";

interface TodoFormProps {
  action: (formData: FormData) => Promise<void>;
}

export default function TodoForm({ action }: TodoFormProps) {
  return (
    <form
      action={action}
      className="space-y-4 bg-white text-black p-6 rounded shadow-md w-full max-w-md mx-auto"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Todo
      </button>
    </form>
  );
}
