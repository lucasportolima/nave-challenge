import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { updateModal } from "../../../store/ducks/system";
import { setNaver } from "../../../store/ducks/navers";
import * as actionTypes from "../../../helpers/actionTypes"

const CardContainer = styled.div`
  width: 280px;
  height: 376px;
`;

const Img = styled.img`
  width: 100%;
  height: 280px;
  display: block;
  cursor: pointer;
`;

const Name = styled.p`
  margin-top: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: var(--body-large);
  color: var(--main-color);
  cursor: pointer;
`;

const Profession = styled.p`
  margin-bottom: 5px;
  font-style: normal;
  font-weight: normal;
  font-size: var(--body-large);
  line-height: var(--heading-h4);
  color: var(--main-color);
`;

const Icons = styled.i`
  font-weight: bold;
  color: var(--main-color);
  margin-right: 13px;
  cursor: pointer;
`;

const Card = ({ img, name, profession, naver }) => {

  const history = useHistory();
  const { modals } = useSelector(state => state.system);
  const dispatch = useDispatch();

  const setNaverRX = () => {
    dispatch(setNaver(naver));
  }

  function setModals(actionType = null) {
    const payload = JSON.parse(JSON.stringify(modals));
    if (actionType) {
      payload.actions.type = actionType;
      payload.actions.show = !payload.actions.show;
    } else {
      payload.profile.show = !payload.profile.show;
    }
    setNaverRX();
    dispatch(updateModal(payload));
  }

  return (
    <CardContainer>
      <Img onClick={() => setModals()} src={img} className="App-logo" alt={name} />
      <Name onClick={() => setModals()}>{name}</Name>
      <Profession>{profession}</Profession>
      <p><Icons onClick={() => setModals(actionTypes.remove)} className="icon-bin2" /><Icons onClick={() => history.push(`/naver/${naver.id}`)} className="icon-pencil" /></p>
    </CardContainer>
  );
};

export default Card;
