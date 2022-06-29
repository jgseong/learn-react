import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from './App';
import 'jest-styled-components';
import { execPath } from 'process';

describe('<App />', () => {
  const titleHome = '할 일 목록';
  const titleAdd = '할 일 추가';
  const titleDetail = '할 일 상세';
  const titleNotFound = '에러';
  const labelGoBack = '돌아가기';
  const labelBtnAddAtHome = '+';
  const labelBtnAdd = '추가';
  const labelBtnDel = '삭제';
  const phAddInput = '할 일을 입력해 주세요';
  const textNotFound = 'Not Found!';

  const stKey = 'ToDoList';
  const stInitData = '["ToDo 1", "ToDo 2", "ToDo 3"]';

  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/');

    localStorage.setItem(stKey, stInitData);

    render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const header = screen.getByText(titleHome);
    expect(header).toBeInTheDocument();

    const toDoItem1 = screen.getByText('ToDo 1');
    expect(toDoItem1).toBeInTheDocument();
    expect(toDoItem1.getAttribute('href')).toBe('/detail/0');

    const toDoItem2 = screen.getByText('ToDo 2');
    expect(toDoItem2).toBeInTheDocument();
    expect(toDoItem2.getAttribute('href')).toBe('/detail/1');

    const toDoItem3 = screen.getByText('ToDo 3');
    expect(toDoItem3).toBeInTheDocument();
    expect(toDoItem3.getAttribute('href')).toBe('/detail/2');

    expect(screen.getAllByText(labelBtnDel).length).toBe(3);

    const label = screen.getByText(labelBtnAddAtHome);
    expect(label).toBeInTheDocument();
  });

  it('deletes toDo item', () => {
    const history = createMemoryHistory();
    history.push('/');

    localStorage.setItem(stKey, stInitData);

    render (
      <Router history={history}>
        <App />
      </Router>
    );

    const toDoItem = screen.getByText('ToDo 2');
    expect(toDoItem).toBeInTheDocument();

    fireEvent.click(toDoItem.nextElementSibling as HTMLElement);

    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(stKey) as string)).not.toContain('ToDo 2');
  });

  it('go to Add page and go back to List page', () => {
    const history = createMemoryHistory();
    history.push('/');

    render (
      <Router history={history}>
        <App />
      </Router>
    );

    const addButton = screen.getByText(labelBtnAddAtHome);
    fireEvent.click(addButton);

    const header = screen.getByText(titleAdd);
    expect(header).toBeInTheDocument();

    const input = screen.getByPlaceholderText(phAddInput);
    expect(input).toBeInTheDocument();

    const button = screen.getByText(labelBtnAdd);
    expect(button).toBeInTheDocument();

    const goBack = screen.getByText(labelGoBack);
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);

    expect(header.textContent).toBe(titleHome);
    expect(addButton.textContent).toBe(labelBtnAddAtHome);
  });

  it('adds a new ToDo', () => {
    const history = createMemoryHistory();
    history.push('/');

    render (
      <Router history={history}>
        <App />
      </Router>
    );

    const addButton = screen.getByText(labelBtnAddAtHome);
    fireEvent.click(addButton);

    const input = screen.getByPlaceholderText(phAddInput);
    const button = screen.getByText(labelBtnAdd);
    fireEvent.change(input, { target: { value: 'New ToDo' } });
    fireEvent.click(button);

    const header = screen.getByText(titleHome);
    expect(header).toBeInTheDocument();
    const newToDo = screen.getByText('New ToDo');
    expect(newToDo).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(stKey) as string)).toContain('New ToDo');
  });

  it('go to Detail page and go back to List page', () => {
    localStorage.setItem(stKey, '["ToDo 1"]');

    const history = createMemoryHistory();
    history.push('/');

    render (
      <Router history={history}>
        <App />
      </Router>,
    );

    const toDoItem = screen.getByText('ToDo 1');
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem);

    const header = screen.getByText(titleDetail);
    expect(header).toBeInTheDocument();

    const toDo = screen.getByText('ToDo 1');
    expect(toDo).toBeInTheDocument();

    const button = screen.getByText(labelBtnDel);
    expect(button).toBeInTheDocument();

    const goBack = screen.getByText(labelGoBack);
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);

    expect(header.textContent).toBe(titleHome);
  });

  it('delete ToDo from the detail page', () => {
    localStorage.setItem(stKey, '["ToDo 1"]');

    const history = createMemoryHistory();
    history.push('/');

    render (
      <Router history={history}>
        <App />
      </Router>,
    );

    const toDoItem = screen.getByText('ToDo 1');
    expect(toDoItem).toBeInTheDocument();
    fireEvent.click(toDoItem);

    const header = screen.getByText(titleDetail);
    expect(header).toBeInTheDocument();
    const deleteButton = screen.getByText(labelBtnDel);
    fireEvent.click(deleteButton);

    expect(header.textContent).toBe(titleHome);
    expect(toDoItem).not.toBeInTheDocument();
    expect(localStorage.getItem(stKey)).toBe('[]');
  });

  it('shows NotFound page if the user enters the wrong URL, and go back to List page', () => {
    const history = createMemoryHistory();
    history.push('/foo');

    render (
      <Router history={history}>
        <App />
      </Router>,
    );

    const header = screen.getByText(titleNotFound);
    expect(header).toBeInTheDocument();

    const notfoundMessage = screen.getByText(textNotFound);
    fireEvent.click(notfoundMessage);

    const goBack = screen.getByText(labelGoBack);
    expect(goBack).toBeInTheDocument();
    fireEvent.click(goBack);

    expect(header.textContent).toBe(titleHome);
  });
});