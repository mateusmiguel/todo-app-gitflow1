'use client';
import { useState } from 'react';
import cuid from 'cuid';
import type { Todo } from '@/types/todo';
import './style.css';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: cuid(),
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodo(title);
    setTitle('');
  };

  return (
    <>
      <form className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Nova tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
        >
          Adicionar
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <span
              className={`cursor-pointer ${t.done ? 'todo--done' : ''}`}
              onClick={() => toggleTodo(t.id)}
            >
              {t.title}
            </span>

            <button onClick={() => deleteTodo(t.id)} className="todo--remove ml-4">
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
