/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

interface GraphViewButtonProps {
    onClick: MouseEventHandler<any> | undefined
    text: string,
    backgroundColor: string
}

export const GraphViewButton: React.FC<GraphViewButtonProps> = ({ onClick, text, backgroundColor }) => {
  const GraphButton = styled.button`
    margin-left: 1rem;
    border: none;
    color: white;
    background-color: ${backgroundColor};
    padding: 5px 10px;
  `;

  return (<GraphButton type="button" onClick={onClick}>{text}</GraphButton>);
}