import * as React from 'react';
import { PageWrapper } from '../PageWrapper';
import styled from 'styled-components/macro';

export function NavBar() {
  return (
    <Wrraper>
      <PageWrapper>
        <div>hello navbar</div>
      </PageWrapper>
    </Wrraper>
  );
}

const Wrraper = styled.header`
  background-color: blue;
`;
