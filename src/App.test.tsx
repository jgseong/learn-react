import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import 'jest-styled-components';
import reportWebVitals from 'reportWebVitals';

describe('<App />', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/');

    const {container} = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    const label = screen.getByText('+');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it ('goes to Add page and goBack to List page', () => {
    const history = createMemoryHistory();
    history.push('/');

    const {container} = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const header = screen.getByText('할 일 추가');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });

  it ('goes to Detail page and goBack to List page', () => {
    localStorage.setItem('ToDoList', '["ToDo 1"]');

    const history = createMemoryHistory();
    history.push('/');

    const {container} = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const toDoItem = screen.getByText('ToDo 1');
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem);

    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const toDo = screen.getByText('ToDo 1');
    expect(toDo).toBeInTheDocument();
    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });

  it ('shows Not Found page if the user enters the wrong URL, and go back to List page', () => {
    const history = createMemoryHistory();
    history.push('/foo');

    /* check/debug for history 
    const history = createMemoryHistory({initialEntries: ['/foo','/']});
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/foo');
    expect(history.entries[1].pathname).toBe('/');
    */

    const { container } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const header = screen.getByText('에러');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const textNotFound = 'Not Found 😭';
    const notFoundMessage = screen.getByText(textNotFound);
    expect(notFoundMessage).toBeInTheDocument();

    expect(container).toMatchSnapshot();
    
    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });

  it ('adds a new ToDo', () => {
    const history = createMemoryHistory();
    history.push('/');

    const {container} = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const button = screen.getByText('추가');

    fireEvent.change(input, { target: { value: 'New ToDo' } });
    fireEvent.click(button);

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();
    const newToDo = screen.getByText('New ToDo');
    expect(newToDo).toBeInTheDocument();
  });

  it ('deletes ToDo from ToDo List page', () => {
    localStorage.setItem('ToDoList', '["ToDo 1"]');

    const history = createMemoryHistory();
    history.push('/');

    const {container} = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const toDoItem = screen.getByText('ToDo 1');
    const deleteButton = screen.getByText('삭제');
    expect(toDoItem).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(toDoItem).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(localStorage.getItem('ToDoList')).toBe('[]');
  });

  it ('deletes ToDo from the detail page', () => {
    localStorage.setItem('ToDoList', '["ToDo 1"]');

    const history = createMemoryHistory();
    history.push('/');

    render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const toDoItem = screen.getByText('ToDo 1');
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem);

    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);
    expect(header.textContent).toBe('할 일 목록');

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();
    expect(localStorage.getItem('ToDoList')).toBe('[]');
  });

  /* old
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
  */

  /* old
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
  */

  /* old
  it('loads localStorage data', () => {
    localStorage.setItem('ToDoList', '["ToDo 1", "ToDo 2", "ToDo 3"]');

    render(<App />);

    expect(screen.getByText('ToDo 1')).toBeInTheDocument();
    expect(screen.getByText('ToDo 2')).toBeInTheDocument();
    expect(screen.getByText('ToDo 3')).toBeInTheDocument();
    expect(screen.getAllByText('삭제').length).toBe(3);
  });
  */
});