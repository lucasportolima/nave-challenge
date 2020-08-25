import React from "react";
import i18n from "./i18n";
import { I18nextProvider, withNamespaces } from "react-i18next";

import Routes from "./routes";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Routes />
    </I18nextProvider>
  );
};

export default withNamespaces("nsMode")(App);
