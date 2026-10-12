
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    box-sizing: border-box;
    display: inline-block;

    /* اندازه اصلی Loader */
    width: 24px;
    height: 38px;

    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;

    position: relative;

    background: linear-gradient(#FF3D00 14px, transparent 0) no-repeat;
    background-size: 1px 19px;
    background-position: 50% 0px;

    animation: spinx 5s linear infinite;
  }

  .loader:before,
  .loader:after {
    content: "";

    width: 19px;
    left: 50%;
    height: 17px;

    position: absolute;
    top: 0;

    transform: translateX(-50%);

    background: rgba(255, 255, 255, 0.4);

    border-radius: 0 0 10px 10px;

    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: 0 0px;

    animation: lqt 5s linear infinite;
  }

  .loader:after {
    top: auto;
    bottom: 0;

    border-radius: 10px 10px 0 0;

    animation: lqb 5s linear infinite;
  }

  @keyframes lqt {
    0%,
    100% {
      background-image: linear-gradient(
        #FF3D00 19px,
        transparent 0
      );
      background-position: 0% 0px;
    }

    50% {
      background-image: linear-gradient(
        #FF3D00 19px,
        transparent 0
      );
      background-position: 0% 19px;
    }

    50.1% {
      background-image: linear-gradient(
        #FF3D00 19px,
        transparent 0
      );
      background-position: 0% -19px;
    }
  }

  @keyframes lqb {
    0% {
      background-image: linear-gradient(
        #FF3D00 19px,
        transparent 0
      );
      background-position: 0 19px;
    }

    100% {
      background-image: linear-gradient(
        #FF3D00 19px,
        transparent 0
      );
      background-position: 0 -19px;
    }
  }

  @keyframes spinx {
    0%,
    49% {
      transform: rotate(0deg);
      background-position: 50% 17px;
    }

    51%,
    98% {
      transform: rotate(180deg);
      background-position: 50% 2px;
    }

    100% {
      transform: rotate(360deg);
      background-position: 50% 17px;
    }
  }
`;

export default Loader;

