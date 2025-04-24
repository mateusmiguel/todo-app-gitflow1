'use client';
import { useState } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title);
    setTitle('');
  };

  return (
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
  );
}
