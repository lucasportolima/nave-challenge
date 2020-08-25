import React from "react";
import { translate } from "react-i18next";

import Header from "../components/shared/uikit/Header";
import PageSlogan from "../components/shared/uikit/PageSlogan";
import Cards from "../components/shared/uikit/Cards";
import MainContainer from "../components/shared/uikit/MainContainer";

const Home = ({ t }) => {
  return (
    <>
      <Header />
      <MainContainer>
        <PageSlogan
          mainText={'Navers'}
          secondaryText={t("btn-add-naver")}
        />
        <Cards></Cards>
      </MainContainer>
    </>
  );
};

export default translate()(Home);