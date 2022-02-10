import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import 'jest-styled-components';
import reportWebVitals from 'reportWebVitals';

describe('<App />', () => {
  it('renders component correctly', () => {
    const {container} = render(<App />);

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    const inputPlaceholder = '할 일을 입력해 주세요';
    const input = screen.getByPlaceholderText(inputPlaceholder);
    expect(input).toBeInTheDocument();
    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it ('adds and deletes ToDo items', () => {
    render(<App />);

    const addButtonText = '추가';
    const deleteButtonText = '삭제';
    const inputPlaceholder = '할 일을 입력해 주세요';
    const inputValue_1 = 'study react 1';
    const inputValue_2 = 'study react 2';
    const testId_ToDoList = 'toDoList';

    const input = screen.getByPlaceholderText(inputPlaceholder);
    const addButton = screen.getByText(addButtonText);
    fireEvent.change(input, { target: { value: inputValue_1 } });
    fireEvent.click(addButton);

    const todoItem_1 = screen.getByText(inputValue_1);
    expect(todoItem_1).toBeInTheDocument();

    const deleteButton = screen.getByText(deleteButtonText);
    expect(deleteButton).toBeInTheDocument();

    const toDoList = screen.getByTestId(testId_ToDoList);
    expect(toDoList.childElementCount).toBe(1);

    fireEvent.change(input, { target: {value: inputValue_2 } });
    fireEvent.click(addButton);

    const todoItem_2 = screen.getByText(inputValue_2);
    expect(todoItem_2).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(2);

    const deleteButtons = screen.getAllByText(deleteButtonText);
    fireEvent.click(deleteButton);

    expect(todoItem_1).not.toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(1);
  });

  it ('does not add empty ToDo', () => {
    render(<App />);

    const addButtonText = '추가';
    const testId_ToDoList = 'toDoList';

    const toDoList = screen.getByTestId(testId_ToDoList);
    const length = toDoList.childElementCount;

    const addButton = screen.getByText(addButtonText);
    fireEvent.click(addButton);

    expect(toDoList.childElementCount).toBe(length);
  });

  it('loads localStorage data', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    render(<App />);

    expect(screen.getByText('ToDo 1')).toBeInTheDocument();
    expect(screen.getByText('ToDo 2')).toBeInTheDocument();
    expect(screen.getByText('ToDo 3')).toBeInTheDocument();
    expect(screen.getAllByText('삭제').length).toBe(3);
  });
});