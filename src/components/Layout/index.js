import React from 'react';
import styled from 'styled-components';

import TopBar from './TopBar';

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: url('/images/background1.png') no-repeat;
  background-size: cover;
`;

const Layout = (props) => {
  const { children } = props;

  return (
    <PageContainer>
      <TopBar />
      {children}
    </PageContainer>
  );
};

export default Layout;
