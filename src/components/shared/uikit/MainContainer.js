import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

import { deleteNaver } from '../../../store/fetchActions';

import ModalProfile from "./ModalProfile";
import ModalActions from "./ModalActions";
import { Loading } from "../styles/Loading"

const Main = styled.section`
  padding: 0 32px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 380px) {
    padding: 0 16px;
  }
`;

const MainContainer = ({ children }) => {

  const system = useSelector(state => state.system);
  const naver = useSelector(state => state.navers.selectedNaver);
  const dispatch = useDispatch()

  function removeNaverT() {
    dispatch(deleteNaver(naver.id));
  }

  return (
    <>
      <Main>
        {children}
      </Main>
      {system.modals.profile.show && <ModalProfile removeNaverT={removeNaverT}></ModalProfile>}
      {system.modals.actions.show && <ModalActions removeNaverT={removeNaverT}></ModalActions>}
      {system.isLoading && <Loading />}
    </>
  );
};

export default MainContainer;