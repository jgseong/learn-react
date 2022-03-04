import React, { useContext } from 'react';
import Styled from 'styled-components';

import { ToDoItem } from 'Components/ToDoItem';
import { ToDoListContext } from 'Contexts';

const Container = Styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #BDBDBD;
  margin-bottom: 20px;
`;

/*
interface Props {
  readonly toDoList: string[];
  readonly deleteToDo: (index: number) => void;
}
*/

export const ToDoList = () => {
  const { toDoList, deleteToDo } = useContext(ToDoListContext);
  return (
    <Container data-testid="toDoList">
      {toDoList.map((item, index) => (
        <ToDoItem key={item} id={index} label={item} onDelete={() => deleteToDo(index)} />
      ))}
    </Container>
  );
};
