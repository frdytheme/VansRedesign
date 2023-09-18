import React from "react";
import styled from "styled-components";

function LoadingBox() {
  return (
    <LoadingBoxStyle>
      <div className="loading_state">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </LoadingBoxStyle>
  );
}

const LoadingBoxStyle = styled.div`
.loading_state {
    font-size: 2vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
      & div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: var(--color-red);
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
        &:nth-child(1) {
          left: 8px;
          animation: lds-ellipsis1 0.6s infinite;
        }
        &:nth-child(2) {
          left: 8px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(3) {
          left: 32px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(4) {
          left: 56px;
          animation: lds-ellipsis3 0.6s infinite;
        }
      }
    }
    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(24px, 0);
      }
    }
  }
`

export default LoadingBox;
