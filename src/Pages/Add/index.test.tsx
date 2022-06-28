import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router, useLocation } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import 'jest-styled-components';

import { Add } from './index';
import { isExportDeclaration, isTypeReferenceNode } from 'typescript';
import { create } from 'domain';
import { url } from 'inspector';
import path from 'path';

const phInput = '할 일을 입력해 주세요';
const textBtnAdd = '추가';
const lstorKey = 'ToDoList';

describe('<Add />', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/add');

    const { container } = render(
      <Router history={history}>
        <Add />
      </Router>,
    );

    const input = screen.getByPlaceholderText(phInput);
    expect(input).toBeInTheDocument();

    const button = screen.getByText(textBtnAdd);
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('add a new ToDo and redirect to the root page', () => {
    localStorage.setItem(lstorKey, '["Old ToDo"]');

    const history = createMemoryHistory();
    history.push('/add');

    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return (<div>{ pathname }</div>);
    };

    render(
      <Router history={history}>
        <TestComponent />
        <Add />
      </Router>,
    );

    const url = screen.getByText('/add');
    expect(url).toBeInTheDocument();

    const input = screen.getByPlaceholderText(phInput);
    const button = screen.getByText(textBtnAdd);

    fireEvent.change(input, { target: { value: 'New ToDo'} });
    fireEvent.click(button);
    expect(localStorage.getItem(lstorKey)).toBe('["Old ToDo","New ToDo"]');
    expect(url.textContent).toBe('/');
  });

  it('do nothing if the input is empty', () => {
    localStorage.setItem(lstorKey, '["Old ToDo"]');

    const history = createMemoryHistory();
    history.push('/add');

    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return (<div>{ pathname }</div>);
    };

    render(
      <Router history={history}>
        <TestComponent />
        <Add />
      </Router>,
    );

    const url = screen.getByText('/add');
    expect(url).toBeInTheDocument();

    const button = screen.getByText(textBtnAdd);
    fireEvent.click(button);

    expect(localStorage.getItem('ToDoList')).toBe('["Old ToDo"]');
    expect(url.textContent).toBe('/add');

  });
});