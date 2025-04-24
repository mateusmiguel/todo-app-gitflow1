import { TodoList } from '@/components/TodoList';

export default function Home() {
  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">My To-Do App</h1>
      <TodoList />
    </main>
  );
}
