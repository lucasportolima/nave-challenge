import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import LeftArrow from "../assets/icons/ic_left.svg";

const BackArrow = styled.div`
  cursor: pointer;
  color: var(--main-color);

  @media only screen and (max-width: 380px) {
    left: 16px;
  }
`;

export default withRouter(({ history }) => {
  return (
    <>
      <BackArrow onClick={() => history.goBack()}>
        <img
          src={LeftArrow}
          alt="triangle with all three sides equal"
          height="20"
          width="20"
        />
      </BackArrow>
    </>
  );
});
