import React, { useState, useEffect } from "react";
import { translate } from "react-i18next";
import styled from "styled-components";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { createNaver, showNaver, updateNaver } from '../store/fetchActions';
import { updateModal } from "../store/ducks/system";
import * as actionTypes from "../helpers/actionTypes"
import { getFullDate } from "../helpers/getFullDate"
import Header from "../components/shared/uikit/Header";
import GoBackArrow from "../components/GoBackArrow";
import { Button } from "../components/shared/styles/Button";
import IconClear from "../assets/icons/ic_clear.svg";

import MainContainer from "../components/shared/uikit/MainContainer";

const TextError = styled.p`
  font-size: var(--body-small);
  line-height: var(--heading-h4);
  padding: 0 0;
  margin: -16px 0 8px 0;
  font-family: var(--font-regular);
  color: var(--support-error);
`;

const FormContainer = styled.form`
  display: block;
  margin: 50px auto 0 auto;
  width: 100%;
  max-width: 592px;
  z-index: 0;
`;

const BoxTopicForm = styled.div`
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;

  .field-form {
    position: relative;
  }

  input {
    max-width: 261px;
    min-width: 261px;
  }

  p {
    position: absolute;
    top: 60px;
  }

  @media only screen and (max-width: 595px) {
    margin-top: 0px;
    flex-direction: column;

    .field-form {
      margin-top: 15px;
    }

    .field-form:first-of-type {
      margin-top: 30px;
    }
  }
`;

const BoxButton = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: flex-end;

  button {
    padding: 8px 50px;
  }
`;

const AddNaver = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: var(--heading-h4);
  line-height: 36px;

  display: flex;
  align-items: center;

  color: var(--main-color);

  span {
    margin-left: 22px;
  }
`;

const FormNavers = ({ t, match }) => {
  const [nextStep, setNextStep] = useState(false);

  const { modals } = useSelector(state => state.system);
  const dispatch = useDispatch();

  function setModals(actionType = null) {
    const payload = JSON.parse(JSON.stringify(modals));
    payload.actions.type = actionType;
    payload.actions.show = !payload.actions.show;
    dispatch(updateModal(payload));
  }

  const validations = yup.object().shape({
    name: yup.string().required(t("input-required")),
    job_role: yup.string().required(t("input-required")),
    birthdate: yup.string().required(t("input-required")),
    admission_date: yup.string().required(t("input-required")),
    project: yup.string().required(t("input-required")),
    url: yup.string().required(t("input-required"))
  });

  const saveOrUpdateNaver = () => {
    setModals(actionTypes.created)
  }

  const formik = useFormik({
    initialValues: {
      job_role: '',
      admission_date: '',
      birthdate: '',
      project: '',
      name: '',
      url: ''
    },
    validationSchema: validations,

    onSubmit: values => {
      values.birthdate = getFullDate(values.birthdate);
      values.admission_date = getFullDate(values.admission_date);
      if ((match.params.id)) {
        delete values.user_id;
        delete values.id;
        dispatch(updateNaver({ data: values, id: match.params.id }));
      } else
        dispatch(createNaver(values));
      saveOrUpdateNaver()
    },
  });

  useEffect(() => {
    if (!(formik.dirty && formik.isValid)) {
      setNextStep(false);
    } else {
      setNextStep(true)
    }
  }, [formik]);

  useEffect(() => {
    async function fetchData() {
      if (match.params.id) {
        const naver = await dispatch(showNaver(match.params.id));
        formik.setValues({ ...naver })
      }
    }
    fetchData();
  }, [dispatch]
  );

  return (
    <>
      <Header />
      <MainContainer>
        <FormContainer onSubmit={formik.handleSubmit}>
          <AddNaver>
            <GoBackArrow></GoBackArrow><span>{t("btn-add-naver")}</span>
          </AddNaver>
          <BoxTopicForm>
            <div className="field-form">
              <input
                id="name"
                placeholder={t("forms-name")}
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <label htmlFor="name">{t("forms-name")}</label>
              <img
                className="field-form_reset"
                src={IconClear}
                onClick={() => formik.setFieldValue("name", "", false)}
                alt=""
              />
              {formik.touched.name && formik.errors.name ? <TextError>{formik.errors.name}</TextError> : null}
            </div>
            <div className="field-form">
              <input
                id="job_role"
                placeholder={t("forms-job")}
                name="job_role"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.job_role}
              />
              <label htmlFor="job_role">{t("forms-job")}</label>
              <img
                className="field-form_reset"
                src={IconClear}
                onClick={() => formik.setFieldValue("job_role", "", false)}
                alt=""
              />
              {formik.touched.job_role && formik.errors.job_role ? <TextError>{formik.errors.job_role}</TextError> : null}
            </div>
          </BoxTopicForm>
          <BoxTopicForm>
            <div className="field-form">
              <input
                id="birthdate"
                placeholder={t("modal-age-label")}
                name="birthdate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthdate}
              />
              <label htmlFor="birthdate">{t("modal-age-label")}</label>
              <img
                className="field-form_reset"
                src={IconClear}
                onClick={() => formik.setFieldValue("birthdate", "", false)}
                alt=""
              />
              {formik.touched.birthdate && formik.errors.birthdate ? <TextError>{formik.errors.birthdate}</TextError> : null}
            </div>
            <div className="field-form">
              <input
                id="cadmission_date"
                placeholder={t("modal-admission-label")}
                name="admission_date"
                type="date"
                pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.admission_date}
              />
              <label htmlFor="admission_date">{t("modal-admission-label")}</label>
              <img
                className="field-form_reset"
                src={IconClear}
                onClick={() => formik.setFieldValue("admission_date", "", false)}
                alt=""
              />
              {formik.touched.admission_date && formik.errors.admission_date ? <TextError>{formik.errors.admission_date}</TextError> : null}
            </div>
          </BoxTopicForm>
          <BoxTopicForm>
            <div className="field-form">
              <input
                id="project"
                placeholder={t("modal-project-label")}
                name="project"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.project}
              />
              <label htmlFor="project">{t("modal-project-label")}</label>
              <img
                className="field-form_reset"
                src={IconClear}
                onClick={() => formik.setFieldValue("project", "", false)}
                alt=""
              />
              {formik.touched.project && formik.errors.project ? <TextError>{formik.errors.project}</TextError> : null}
            </div>
            <div className="field-form">
              <input
                id="url"
                placeholder={t("forms-url")}
                name="url"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.url}
              />
              <label htmlFor="url">{t("forms-url")}</label>
              <img
                className="field-form_reset"
                src={IconClear}
                onClick={() => formik.setFieldValue("url", "", false)}
                alt=""
              />
              {formik.touched.url && formik.errors.url ? <TextError>{formik.errors.url}</TextError> : null}
            </div>
          </BoxTopicForm>
          <BoxButton>
            <Button
              disabled={!nextStep}
              border={nextStep}
              allowed={nextStep}
              shadow={false}
              type="submit"
            >
              <span>{t("btn-save")}</span>
            </Button>
          </BoxButton>
        </FormContainer>
      </MainContainer>
    </>
  );
};

export default translate()(FormNavers);