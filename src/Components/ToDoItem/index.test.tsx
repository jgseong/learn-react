import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import 'jest-styled-components';

import { ToDoItem } from './index';

describe ('<ToDoItem />', () => {
  it ('renders component correctly', () => {
    const defaultValue = 'default value';
    const { container } = render(
      <Router>
        <ToDoItem id={1} label={defaultValue} />
      </Router>,
    );

    const todoItem = screen.getByText(defaultValue);
    expect(todoItem).toBeInTheDocument();
    expect(todoItem.getAttribute('href')).toBe('/detail/1');

    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it ('clicks the delete button', () => {
    const handleClick = jest.fn();
    const defaultValue = 'default value';

    render( 
      <Router>
        <ToDoItem id={1} label={defaultValue} onDelete={handleClick} /> 
      </Router>,
    );

    const deleteButton = screen.getByText('삭제');
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(deleteButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it ('clicks the link', () => {
    const defaultValue = 'default value';
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();

      return (
        <div>
          <div>{pathname}</div>
          <ToDoItem id={1} label={defaultValue} />
        </div>
      );
    };

    render(
      <Router>
        <TestComponent />
      </Router>,
    );

    const pathName = screen.getByText('/');
    expect(pathName).toBeInTheDocument();
    const todoItem = screen.getByText(defaultValue);
    fireEvent.click(todoItem);
    expect(pathName.textContent).toBe('/detail/1');
  });
});