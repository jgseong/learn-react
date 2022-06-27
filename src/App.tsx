import React from 'react';
import Styled from 'styled-components';
import { PageHeader, Button } from 'Components';
import { List } from 'Pages';

const Container = Styled.div`
  min-height: 100vh;
  background-color: #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <PageHeader />
      <List />
      {/* <Button label = "추가" /> */}
    </Container>
  );
}

export default App;
