import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import useAuth from '../../hooks/useAuth';

const TopContainer = styled.div`
  position: relative;
  padding: 0 10px;
  height: 65px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  img {
    cursor: default;
    user-select: none;
  }
`;

const RtContent = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background: #44c4e2;
  padding: 9.5px 20px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  line-height: 14px;
  border-radius: 50px;
  height: 33px;
  max-width: 200px;
  min-width: initial;
  cursor: pointer;
`;

const DrugBalance = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 6px;
  }

  span,
  p {
    margin: 0;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    font-family: Roboto;
  }
  span {
    color: #44c4e2;
  }
  p {
    color: white;
  }
`;

const Price = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  margin: 0 9px;
  border: 2px solid #44c4e2;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  font-family: Roboto;
  height: 33px;
  border-radius: 24px;
  color: white;

  svg {
    position: absolute;
    top: 4px;
    right: 4px;
  }
`;

const TopBar = () => {
  const { account } = useWeb3React();
  const { login } = useAuth();

  const handleConnect = () => {
    if (!account) login('injected');
  };

  return (
    <TopContainer>
      <img src="/images/HyperSwap.png" alt="logo" />

      <RtContent>
        <DrugBalance>
          <img src="/images/alloy.png" alt="drug" />
          <div>
            <p>4,000</p>
            <span>($600.00)</span>
          </div>
        </DrugBalance>
        <Price>
          <span>Price: $0.15</span>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="25" height="25" rx="12.5" fill="#44C4E2" />
            <path d="M13 18L8.66987 10.5L17.3301 10.5L13 18Z" fill="white" />
          </svg>
        </Price>
        <Button onClick={handleConnect}>
          {account
            ? `${account.substr(0, 4)}...${account.substr(
                account.length - 4,
                account.length - 1
              )}`
            : 'Connect'}
        </Button>
      </RtContent>
    </TopContainer>
  );
};

export default TopBar;
