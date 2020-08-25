import styled from "styled-components";

export const Button = styled.button`
  background: var(--main-color);
  font-weight: 600;
  font-size: var(--body-medium);
  border: none;
  padding: 8px 25px;
  height: 40px;
  color: var(--white);
  cursor: ${(props) => (props.allowed ? "pointer" : "not-allowed")};
  line-height: var(--heading-h4);
  font-size: var(--body-large);
  font-family: var(--font-secondary-bold);
  box-shadow: ${(props) =>
    props.shadow ? "2px 2px 8px 0 var(--anthracite-30)" : ""};
`;
