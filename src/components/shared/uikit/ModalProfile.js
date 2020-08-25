import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { translate } from "react-i18next";

import { updateModal } from "../../../store/ducks/system";
import * as actionTypes from "../../../helpers/actionTypes";
import { getFullDate } from "../../../helpers/getFullDate";

import { Modal } from "../styles/Modal";

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  width: 70vw;
  max-width: 900px;
  min-width: 580px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: var(--white);
  }

  &::-webkit-scrollbar-thumb {
    border-spacing: 10px 10px;
    background-color: var(--main-color);
  }

  @media only screen and (max-width: 632px) {
    width: calc(100% - 40px);
    max-width: 450px !important;
    min-width: initial !important;

    height: 85vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

const Close = styled.div`
  position: relative;
  top: -20px;
  right: -4px;
  color: var(--main-color);
  float: right;
  font-size: var(--heading-h3);
  font-weight: bold;

  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  @media only screen and (max-width: 632px) {
    top: -468px;
    color: #ddd;

    &:hover,
    &:focus {
      color: var(--white);
    }
  }
`;

const BoxImage = styled.div`
  height: 450px;
  width: 50%;
  max-width: 450px;

  @media only screen and (max-width: 632px) {
    width: 100%;
  }
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const BoxContent = styled.div`
  padding: 32px 21px 27px 30.2px;
  width: 50%;
  display: block;
  box-sizing: border-box;
  position: relative;

  @media only screen and (max-width: 632px) {
    width: 100%;
  }

  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: var(--heading-h4);
    line-height: 36px;
    /* identical to box height, or 150% */

    display: flex;
    align-items: center;

    color: #000000;
  }

  .label-text {
    font-style: normal;
    font-weight: 600;
    font-size: var(--body-large);
    line-height: var(--heading-h4);

    color: var(--main-color);
  }

  p:first-of-type {
    margin: 5px 0 18px 0;
  }

  .body-text {
    font-style: normal;
    font-weight: normal;
    font-size: var(--body-large);
    line-height: var(--heading-h4);
    margin: 5px 0 18px 0;

    color: var(--main-color);
  }
`;

const BoxIcons = styled.div`
  position: absolute;
  bottom: 0px;
`;

const Icons = styled.i`
  font-weight: bold;
  color: var(--main-color);
  margin-right: 13px;
  cursor: pointer;
`;

const ModalProfile = ({ t }) => {

  const { modals } = useSelector(state => state.system);
  const naver = useSelector(state => state.navers.selectedNaver);
  const history = useHistory();
  const dispatch = useDispatch();

  function setModals(actionType = null) {
    const payload = JSON.parse(JSON.stringify(modals));
    if (actionType) {
      payload.actions.type = actionType;
      payload.actions.show = !payload.actions.show;
    } else {
      payload.profile.show = !payload.profile.show;
    }
    dispatch(updateModal(payload));
  }

  const goToUpdateNaver = id => {
    setModals();
    history.push(`/naver/${id}`)
  }

  return (
    <Modal id="myModal">
      <ModalContent>
        <BoxImage>
          <Img src={naver.url} className="App-logo" alt="" />
        </BoxImage>
        <BoxContent>
          <Close onClick={() => setModals()}>&times;</Close>
          <h3>{naver.name}</h3>
          <p className="body-text">{naver.job_role}</p>
          <p className="label-text">{t("modal-age-label")}</p>
          <p className="body-text">{getFullDate(naver.birthdate)}</p>
          <p className="label-text">{t("modal-admission-label")}</p>
          <p className="body-text">{getFullDate(naver.admission_date)}</p>
          <p className="label-text">{t("modal-project-label")}</p>
          <p className="body-text">{naver.project}</p>
          <BoxIcons>
            <p><Icons onClick={() => setModals(actionTypes.remove)} className="icon-bin2" /><Icons onClick={() => goToUpdateNaver(naver.id)} className="icon-pencil" /></p>
          </BoxIcons>
        </BoxContent>
      </ModalContent>
    </Modal>
  );
};

export default translate()(ModalProfile);
