import '@testing-library/jest-dom';
import cuid from 'cuid';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from "../../components/TodoList"
import { log } from 'console';

jest.mock("cuid", () => jest.fn().mockReturnValue(123));

describe('TodoList', () => {
    it('adiciona uma nova tarefa à lista', () => {
        render(<TodoList />);

        const input = screen.getByPlaceholderText("Nova tarefa");
        const addButton = screen.getByText("Adicionar");

        fireEvent.change(input, { target: { value: "Estudar testes" } });
        fireEvent.click(addButton);

        expect(input).toBeInTheDocument();
        expect(screen.getByText("Estudar testes")).toBeInTheDocument();
    });

    it('marca uma tarefa como concluída', () => {
        const { getByText } = render(<TodoList />);

        fireEvent.change(screen.getByPlaceholderText('Nova tarefa'), {
            target: { value: 'task' }
        });
        fireEvent.click(screen.getByText('Adicionar'));

        const task = getByText('task');
        fireEvent.click(task);

        expect(task).toBeInTheDocument();
        expect(task).toHaveClass('todo--done');
    });

    it('remove uma tarefa da lista', () => {
        const { getByText } = render(<TodoList />);

        fireEvent.change(screen.getByPlaceholderText('Nova tarefa'), {
            target: { value: 'task' }
        });
        fireEvent.click(screen.getByText('Adicionar'))

        const task = getByText('task');
        fireEvent.click(screen.getByText('🗑️'));

        expect(task).not.toBeInTheDocument();
    });
});