import styled from 'styled-components';


export const CustomizedButton = styled.button`
  color: rgb(62, 0, 143);
  border: none;
  border-radius: 0;
  font-size: 16px;

  &:hover {
    transform: scale(0.98);
  }

  &:focus {
    transform: scale(0.96);
  }

  &.round {
    border-radius: 10px;
  }

  &.blue {
    background-color:  rgb(70, 181, 255);
  }

  &.soft-green {
    background-color: rgb(110, 224, 70);
  }

  &.green {
    background-color: rgb(39, 194, 39);
  }

  &.orange {
    background-color: rgb(255, 192, 97);
  }

  &.yellow {
    background-color: #ffd900;
  }

  &.red {
    background-color: rgb(200, 55, 10);
  }

  &.arrow {
    font-size: 27px;
    height: 47px;
  }

  &.white-text {
    color: rgb(255, 255, 255);
  }

  &.invalid{
    background-color: rgb(160, 160, 160);
  }

  &.invalid:hover{
    transform: scale(1);
  }

  &.small{
    @media (min-width: 900px) {
      font-size: 14px;
    }
    
    @media (max-width: 900px) {
      font-size: 2.4vw;
    }
    
    @media (max-width: 700px) {
      font-size: 3vw;
    }
  }

  @media (max-width: 400px) {
    font-size: 4vw;
  }

  @media (max-width: 950px) {
    font-size: 1.7vw;
  }

  @media (max-width: 770px) {
    font-size: 16px;
  }

  &.mini{
    font-size: 16px;
    @media (max-width: 700px) {
      font-size: 2.7vw;
    }
  }
`;

export const CustomizedDiv = styled.div`
  color: rgb(62, 0, 143);
  border: none;
  border-radius: 0;
  font-size: 16px;
  text-align: center;

  &.round {
    border-radius: 10px;
  }

  background-color: rgb(160, 160, 160);
  

  &.small{
    @media (min-width: 900px) {
      font-size: 14px;
    }
    
    @media (max-width: 900px) {
      font-size: 2.4vw;
    }
    
    @media (max-width: 700px) {
      font-size: 3vw;
    }
  }

  @media (max-width: 400px) {
    font-size: 4vw;
  }

  @media (max-width: 950px) {
    font-size: 1.7vw;
  }

  @media (max-width: 770px) {
    font-size: 16px;
  }

  &.mini{
    font-size: 16px;
    @media (max-width: 700px) {
      font-size: 2.7vw;
    }
  }
`;

CustomizedDiv.displayName = 'CustomizedDiv';

export const ButtonText = styled.h5`
  margin: 10px 10px 10px 10px;

  &.small{
    @media (max-width: 570px){
      margin: 0
    }
  }
`;

ButtonText.displayName = 'ButtonText'