import { prisma } from "../lib/prisma";
import TodoForm from "../components/TodoForm";
import TodoList, { Todo } from "../components/TodoList";
import { addTodo, toggleTodo, deleteTodo } from "./actions/todoActions";

async function getTodos(): Promise<Todo[]> {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
  return todos.map((todo) => ({
    ...todo,
    description: todo.description ?? undefined,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  }));
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
      <TodoForm action={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={async () => {}}
      />
    </main>
  );
}
