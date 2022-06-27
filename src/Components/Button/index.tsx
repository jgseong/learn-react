import React from 'react';
import Styled from 'styled-components';

const defaultBackgroundColor = '#304FFE';
const defaultHoverColor = '#1E40FF';

interface ContainerProps {
  readonly backgroundColor?: string;
  readonly hoverColor?: string;
}

const Container = Styled.div<ContainerProps>`
  text-align: center;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor ?? defaultBackgroundColor};
  &:hover {
    background-color: ${(props) => props.hoverColor ?? defaultHoverColor};
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
const Label = Styled.div`
  color: #FFFFFF;
  font-size: 16px;
`;

interface Props {
  readonly label:  string;
  readonly backgroundColor?:  string;
  readonly hoverColor?:  string;
  readonly onClick?: () => void;
}

export const Button = (
  { label, 
    backgroundColor = defaultBackgroundColor, 
    hoverColor = defaultHoverColor,
    onClick
  }: Props) => {
  return (
    <Container backgroundColor={backgroundColor} hoverColor={hoverColor} onClick={onClick}>
      <Label>{label}</Label>
    </Container>
  );
};