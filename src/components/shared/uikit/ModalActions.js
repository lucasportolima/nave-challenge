import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { translate } from "react-i18next";

import { updateModal } from "../../../store/ducks/system";
import * as actionTypes from "../../../helpers/actionTypes"

import { Button } from "../styles/Button";
import { Modal } from "../styles/Modal";

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  width: 90vw;
  max-width: 592px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Close = styled.div`
  position: relative;
  top: -18px;
  right: -9px;
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
`;

const BoxContent = styled.div`
  padding: 27px 27px;
  width: 100%;
  display: block;
  position: relative;
`;

const Title = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: var(--heading-h4);
  line-height: 36px;

  display: flex;
  align-items: center;

  color: var(--main-color);
`;

const BodyText = styled.p`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: var(--body-large);
  line-height: var(--heading-h5);
  margin-top: 10px;

  display: flex;
  align-items: center;

  color: var(--main-color);
`;

const BoxButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;

  button:first-of-type {
    background-color: var(--white) !important;
    border: 1px solid var(--main-color);
    margin-right: 24px;
    color: var(--main-color);
  }

  button {
    padding: 8px 50px;
  }

  @media only screen and (max-width: 460px) {
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;

    button {
      margin: auto !important;
    }

    button:last-of-type {
      margin-top: 15px !important;
    }
  }
`;


const ModalProfile = ({ t, removeNaverT }) => {
  const history = useHistory();

  const { modals } = useSelector(state => state.system);
  const payload = JSON.parse(JSON.stringify(modals));
  const dispatch = useDispatch();

  function closeModal() {
    payload.actions.show = !payload.actions.show;
    dispatch(updateModal(payload));
    history.push('/home');
  }

  function getModalTitle(type) {
    const titles = {
      UPDATED: t("modal-actions-updated"),
      CREATED: t("modal-actions-created"),
      REMOVED: t("modal-actions-removed"),
      REMOVE: t("modal-actions-remove")
    }

    return titles[type]
  }

  function getModalText(type) {
    const texts = {
      REMOVE: t("modal-actions-remove-body"),
      REMOVED: t("modal-actions-removed-body"),
      UPDATED: t("modal-actions-updated-body"),
      CREATED: t("modal-actions-created-body")
    }

    return texts[type]
  }

  function removeNaver() {
    payload.actions.type = actionTypes.removed;
    dispatch(updateModal(payload));
  }

  return (
    <Modal id="myModal">
      <ModalContent>
        <BoxContent>
          <Close onClick={closeModal}>&times;</Close>
          <Title>{getModalTitle(modals.actions.type)}</Title>
          <BodyText>{getModalText(modals.actions.type)}</BodyText>
          {modals.actions.type === actionTypes.remove && <BoxButtons>
            <Button
              onClick={closeModal}
              disabled={false}
              border={false}
              allowed={true}
              shadow={false}
            >{t("btn-cancel")}</Button>
            <Button
              onClick={() => removeNaverT()}
              disabled={false}
              border={false}
              allowed={true}
              shadow={false}
            >{t("btn-delete")}</Button>
          </BoxButtons>}
        </BoxContent>
      </ModalContent>
    </Modal>
  );
};

export default translate()(ModalProfile);
