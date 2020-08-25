import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { translate } from "react-i18next";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import * as yup from "yup";

import { authLogin } from '../store/fetchActions';
import { emailRegex } from "../helpers/emailRegex";

import IconClear from "../assets/icons/ic_clear.svg";
import logo from "../assets/images/logo.png";

import { Button } from "../components/shared/styles/Button";
import { TextError } from "../components/shared/styles/TextError";

const Container = styled.div`
  height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0px 20px;
`;

const LoginForm = styled.form`
  display: block;
  margin: auto;
  width: 448px;
  height: fit-content;
  min-height: 408px;
  padding: 40px 32px;
  border: 1px solid var(--main-color);
  box-sizing: border-box;
`;

const Img = styled.img`
  height: 60px;
  display: block;
  margin: 0px auto 40px auto;
`;

const BoxButton = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const Password = styled.div`
  margin: 40px 0px 0px 0px;
`;

const PasswordError = styled.div`
  p {
    margin: 0px;
  }
`;

const Login = ({ t }) => {
  const [nextStep, setNextStep] = useState(false);
  const dispatch = useDispatch();

  const validations = yup.object().shape({
    email: yup.string().matches(emailRegex, t("login-invalid-email")).required(t("login-required-email")),
    password: yup.string().required(t("login-required-password"))
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: validations,

    onSubmit: values => {
      dispatch(authLogin(values));
    },
  });

  useEffect(() => {
    if (!(formik.dirty && formik.isValid)) {
      setNextStep(false);
    } else {
      setNextStep(true)
    }
  }, [formik]);

  return (
    <>
      <Container>
        <LoginForm onSubmit={formik.handleSubmit}>
          <Img src={logo} className="App-logo" alt="nave.rs" />
          <div className={`field-form ${formik.touched.email && formik.errors.email ? "field-error" : ""}`}>
            <input
              id="email"
              placeholder="E-mail"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label htmlFor="email">E-mail</label>
            <img
              className="field-form_reset"
              src={IconClear}
              onClick={() => formik.setFieldValue("email", "", false)}
              alt=""
            />
          </div>
          {formik.touched.email && formik.errors.email ? <TextError>{formik.errors.email}</TextError> : null}

          <Password className={`field-form ${formik.touched.password && formik.errors.password ? "field-error" : ""}`}>
            <input
              id="password"
              placeholder={t("login-password")}
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label htmlFor="password">{t("login-password")}</label>
            <img
              className="field-form_reset"
              src={IconClear}
              onClick={() => formik.setFieldValue("password", "", false)}
              alt=""
            />
          </Password>
          <PasswordError>
            {formik.touched.password && formik.errors.password ? <TextError>{formik.errors.password}</TextError> : null}
          </PasswordError>

          <BoxButton>
            <Button
              disabled={!nextStep}
              border={nextStep}
              allowed={nextStep}
              shadow={false}
              type="submit"
            >
              <span>{t("login-signin")}</span>
            </Button>
          </BoxButton>
        </LoginForm>
      </Container>
    </>
  );
};

export default translate()(Login);
