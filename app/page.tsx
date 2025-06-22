import { getServerSession } from 'next-auth';
import TodoForm from '../components/TodoForm';
import TodoList, { Todo } from '../components/TodoList';
import prisma from '../lib/prisma';
import {
	addTodo,
	deleteTodo,
	toggleTodo
} from './actions/todoActions';

async function getTodos(userId: number): Promise<Todo[]> {
	const todos = await prisma.todo.findMany({
		where: { authorId: userId },
		orderBy: { createdAt: 'desc' }
	});
	return todos.map(todo => ({
		...todo,
		description: todo.description ?? undefined,
		createdAt: todo.createdAt.toISOString(),
		updatedAt: todo.updatedAt.toISOString()
	}));
}

export default async function Home() {
	const session = await getServerSession();

	if (!session || !session.user?.email) {
		return (
			<main className='min-h-screen bg-gray-100 py-10 text-black'>
				<h1 className='text-3xl font-bold text-center mb-8'>
					Todo App
				</h1>
				<p className='text-center'>Please login first to add todos</p>
			</main>
		);
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email }
	});

	if (!user) {
		return (
			<main className='min-h-screen bg-gray-100 py-10'>
				<h1 className='text-3xl font-bold text-center mb-8'>
					Todo App
				</h1>
				<p className='text-center'>User not found.</p>
			</main>
		);
	}

	const todos = await getTodos(user.id);
	return (
		<main className='min-h-screen bg-gray-100 py-10'>
			<h1 className='text-3xl font-bold text-center mb-8'>
				Todo App
			</h1>
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
