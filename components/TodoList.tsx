'use client';
import { useState } from 'react';
import type { Todo } from '@/types/todo';
import { TodoForm } from './TodoForm';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      done: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <TodoForm onAdd={addTodo} />
      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <span
              className={`cursor-pointer ${t.done ? 'line-through text-gray-500' : ''}`}
              onClick={() => toggleTodo(t.id)}
            >
              {t.title}
            </span>

            <button onClick={() => deleteTodo(t.id)} className="ml-4">
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
