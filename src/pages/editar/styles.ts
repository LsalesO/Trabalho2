import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  button {
    color: aliceblue;
    padding: 0.5rem;
    margin: 0.5rem 0;
    background-color: #a80606;
    border: 3px outset rgb(224, 224, 224);
  }

  input {
    padding: 0.3rem;
    margin: 0.1rem;
    color: #000;
    background: rgb(240, 240, 240);
    border: 3px inset rgb(224, 224, 224);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  border: 1px dashed;
  padding: 1rem;

  border: 3px outset rgb(224, 224, 224);
`;
