import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Title } from "../styles/Title";
import { Button } from "../styles/Button";

const PageSloganContainer = styled.div`
  position: relative;
  margin-top: 30px;
  display: inline-flex;
`;

const BoxButton = styled.div`
  position: absolute;
  right: 0px;

  @media only screen and (max-width: 380px) {
    right: 16px;
  }
`;

const PageSlogan = ({ mainText, secondaryText }) => {
  const history = useHistory();

  return (
    <PageSloganContainer>
      <Title>{mainText}</Title>
      <BoxButton>
        <Button
          allowed={true}
          onClick={() => history.push('/naver')}
        >{secondaryText}</Button>
      </BoxButton>
    </PageSloganContainer>
  );
};

export default PageSlogan;
