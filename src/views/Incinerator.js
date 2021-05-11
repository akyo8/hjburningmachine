import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';

import useAuth from '../hooks/useAuth';
import Dropdown from '../components/Dropdown';
import { getLPContract } from '../utils/contractHelpers';
import useWeb3 from '../hooks/useWeb3';
import { useChefContract } from '../hooks/useContract';

const Container = styled.div`
  position: relative;
  margin: auto;
  max-width: 860px;
  font-family: Roboto;
  font-weight: 700;
  font-size: 13px;
  line-height: 22.75px;
  color: white;
`;

const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 2rem;
  margin-bottom: 25px;

  p {
    margin: 0;
    max-width: 430px;
  }

  img {
    width: 300px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  position: relative;
  width: 420px;
  height: 450px;
  padding: 22px 35px 38px 35px;
  box-sizing: border-box;
  z-index: 2;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  p {
    margin-top: 0;
    margin-bottom: 25px;
  }

  span {
    font-size: 18px;
    font-weight: bold;
    line-height: 39px;
  }

  .total-burn {
    font-size: 18px;
    font-weight: bold;
    line-height: 39px;
    text-align: center;
    margin: 0;
  }
`;

const Row = styled.div`
  display: flex;
`;

const TotalBurn = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0d1d36;
  border-radius: 15px;
  padding: 10px 25px;
  box-sizing: border-box;

  h1 {
    font-size: 20px;
  }
`;

const IncinerateButton = styled.div`
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translateX(-50%);
  width: 222px;
  height: 222px;
  border-radius: 50%;

  > img {
    position: relative;
    width: 100%;
    height: 100%;
    user-select: none;
  }
`;

const lpPairs = [
  {
    pairName: 'ALLOY',
    address: '0xa07a3cb2afbd4684d45aad03fe4795bc6d5b96c8',
    token0: '0x5ef5994fa33ff4eb6c82d51ee1dc145c546065bd',
    token1: '0x81100f79eb6c3314ee8974a02fa10203c90b0e74',
  },
  {
    pairName: 'ALLOY-BNB',
    address: '0xf08865069864a5a62eb4dd4b9dcb66834822a198',
    token0: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
    token1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  },
  {
    pairName: 'DRUGS-BNB',
    address: '0x421df185ff87bc5f19bd5a90102a51452b70c4a4',
    token0: '0x47bead2563dcbf3bf2c9407fea4dc236faba485a',
    token1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  },
  {
    pairName: 'HOPE-BNB',
    address: '0x8fee8b699c1da1903928e9eb82caafabbd75dd1e',
    token0: '0xd670af9aec073f531e3ed4ec44bb6959ea11668b',
    token1: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  },
  {
    pairName: 'BUSD-BREW',
    address: '0xeed2c2fa58d66cae9e4761aa7e56cb98a0ce4495',
    token0: '0x790be81c3ca0e53974be2688cdb954732c9862e1',
    token1: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  },
];

const Incinerator = () => {
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  const [incClicked, setIncClicked] = useState(false);
  const web3 = useWeb3();
  const chefContract = useChefContract();
  const [lpInfo, setLpInfo] = useState(lpPairs);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    login('injected');
  }, []);

  useEffect(() => {
    if (account && web3) {
      fetchFarmInfo();
    }
  }, [account, web3]);

  const fetchFarmInfo = async () => {
    const tmpInfo = lpInfo;

    for (let i = 0; i < tmpInfo.length; i++) {
      const lpContract = getLPContract(tmpInfo[i].address, web3);
      const res = await lpContract.methods.balanceOf(account).call();

      tmpInfo[i]['pairAmount'] = new BigNumber(res);
      tmpInfo[i]['pairAmountDollar'] = new BigNumber(res);
    }

    setLpInfo(
      [...tmpInfo].map((it) => {
        return { ...it };
      })
    );
  };

  const handleSelect = (i) => {
    setTotal(lpPairs[i].pairAmount);
    setIndex(i);
  };

  const handleBurn = () => {
    if (index !== -1) {
      chefContract.methods
        .convertBurnToken(lpPairs[index].token0, lpPairs[index].token1)
        .send({ from: account })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container>
      <TopContent>
        <img src="/images/incinerator/logo.png" alt="logo" />
        <p>
          Time to feel the heat crewmate! 1% of every deposit into the Asteroid
          Field is used to buy back HyperALLOY. That ALLOY get’s sent here. It’s
          up to YOU to burn that ALLOY out of existence. Do you have what it
          takes?
        </p>
      </TopContent>
      <Content>
        <Card>
          <img
            className="back"
            src="/images/incinerator/swap_panel.png"
            alt="panel1"
          />
          <p>
            Choose up to 4 pairs to be burned. Each pair will incure a seperate
            gas fee.
          </p>
          <Row>
            <span>LP Pair</span>
            <span style={{ marginLeft: 90 }}>Value</span>
          </Row>

          <Dropdown options={lpPairs} index={-1} onSelect={handleSelect} />
        </Card>
        <Card>
          <img
            className="back"
            src="/images/incinerator/swap_panel_2.png"
            alt="panel2"
          />
          <p className="total-burn">Total to Burn</p>

          <TotalBurn>
            <h1>{`${new BigNumber(total).shiftedBy(-18).toFixed(4)} TLP`}</h1>
            <h1>{`${new BigNumber(total).shiftedBy(-18).toFixed(4)}`} </h1>
          </TotalBurn>

          <IncinerateButton
            onMouseDown={() => setIncClicked(true)}
            onMouseUp={() => {
              setIncClicked(false);
              handleBurn();
            }}
          >
            <img
              src={
                incClicked
                  ? '/images/incinerator/button-pressed.png'
                  : '/images/incinerator/button-resting.png'
              }
              alt=""
            />
          </IncinerateButton>
        </Card>
      </Content>
    </Container>
  );
};

export default Incinerator;
