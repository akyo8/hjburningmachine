import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  font-size: 14px;
  text-align: center;
`;

const Selected = styled.div`
  position: relative;
  padding: 10px 35px 10px 15px;
  background-color: #0d1d36;
  font-family: Roboto;
  border-radius: 15px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }

  span {
    color: #43c1df;
    font-size: 13px;
    line-height: 28px;
  }

  svg {
    position: absolute;
    top: 38px;
    right: 15px;
    transform: rotate(0);
    transition: transform 0.3s ease-out;

    ${(props) =>
      props.open &&
      `
        transform: rotate(180deg);
    `}
  }
`;

const List = styled.div`
  width: 100%;
  position: absolute;
  background-color: #0d1d36;
  border-radius: 15px;
  max-height: 384px;
  overflow: auto;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #0d1d36;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #44c4e2;
  }
`;

const ListItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  box-sizing: border-box;
  cursor: pointer;

  h1 {
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }

  span {
    color: #43c1df;
    font-size: 13px;
    line-height: 28px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const Dropdown = (props) => {
  const { options, onSelect } = props;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(props.index);

  return (
    <Container>
      <Selected open={open} onClick={() => setOpen(!open)}>
        {index === -1 ? (
          <h1>Choose an LP Pair</h1>
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1>{options[index].pairName}</h1>
            <div>
              <h1>{Number(options[index].pairAmount).toLocaleString()} TLP</h1>
              <span>
                ${Number(options[index].pairAmountDollar).toLocaleString()}
              </span>
            </div>
          </div>
        )}
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L0.669873 -8.15666e-07L9.33013 -5.85621e-08L5 7.5Z"
            fill="#C4C4C4"
          />
        </svg>
      </Selected>

      {open && (
        <List>
          {options.map((item, i) => {
            return (
              <ListItem
                key={item.pairName}
                onClick={() => {
                  setIndex(i);
                  onSelect(i);
                  setOpen(false);
                }}
              >
                <h1>{item.pairName}</h1>
                <div>
                  <h1>{Number(item.pairAmount).toLocaleString()} TLP</h1>
                  <span>${Number(item.pairAmountDollar).toLocaleString()}</span>
                </div>
              </ListItem>
            );
          })}
        </List>
      )}
    </Container>
  );
};

export default Dropdown;
