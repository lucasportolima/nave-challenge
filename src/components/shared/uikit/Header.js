import React from "react";
import { translate } from "react-i18next";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

import AuthService from '../../../network/services/auth-service';

import logo from "../../../assets/images/logo.png";

const Nav = styled.nav`
  background: var(--white);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='var(--support-error)',GradientType=1 );
  height: 85px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 32px;

  @media only screen and (max-width: 380px) {
    padding: 0 16px;
  }
`;

const Img = styled.img`
  height: 37px;
  cursor: pointer;
  position: absolute;
  top: 24px;
  left: 32px;

  @media only screen and (max-width: 380px) {
    left: 16px;
  }
`;

const Logout = styled.span`
  position: absolute;
  width: 28px;
  height: 24px;
  top: 30px;
  right:32px;
  font-weight: 600;
  font-size: var(--body-medium);
  line-height: var(--heading-h4);
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  cursor: pointer;
  
  @media only screen and (max-width: 380px) {
    right: 16px;
  }
`;

const Header = ({ t }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function authLogoutButton() {
    isAuthenticated && dispatch(AuthService.logout());
  }

  return (
    <div>
      <Nav className="App-header">
        <Img src={logo} className="App-logo" alt="Nave.rs" />
        <Logout onClick={authLogoutButton}>{t("header-logout")}</Logout>
      </Nav>
    </div>
  );
};

export default translate()(Header);
