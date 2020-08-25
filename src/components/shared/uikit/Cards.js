import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';

import { getAllNavers } from '../../../store/fetchActions';

import Card from "./Card";

const FlexContainer = styled.div`
  margin-top: 35px;
  margin-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const BoxCard = styled.div`
  margin-top: 20px;

  @media only screen and (max-width: 632px) {
    margin: 20px auto;
  }
`;

const Cards = () => {
  const navers = useSelector((state) => state.navers.data);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getAllNavers());
    },
    [dispatch]
  );

  return (
    <>
      <FlexContainer>
        {
          navers.map((naver, index) => <BoxCard key={naver.id}><Card
            naver={naver}
            img={naver.url}
            name={naver.name}
            profession={naver.job_role}
          ></Card></BoxCard>)
        }
      </FlexContainer>
    </>
  );
};

export default Cards;
