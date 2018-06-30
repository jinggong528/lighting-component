import React from "react";
import styled from "styled-components";

import Switch from "react-toggle-switch";

const Container = styled.div`
  display: inline-flex;
  align-items: center;
`;

const LightActiveP = styled.span`
  padding-left: 10px;
`;

const LightActiveCell = ({ onClick = () => {}, active }) => {
  return (
    <Container>
      <Switch onClick={() => onClick(!active)} on={active} />
      <LightActiveP> {active ? "On" : "Off"}</LightActiveP>
    </Container>
  );
};

export default LightActiveCell;
