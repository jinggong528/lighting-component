import React from "react";
import styled from "styled-components";
import "react-toggle-switch/dist/css/switch.min.css";
import Switch from "react-toggle-switch";

const Container = styled.div`
  display: inline-flex;
  align-items: center;
`;

const LightActiveS = styled.span`
  padding-left: 10px;
`;

const LightActiveCell = ({ onClick = () => {}, active = false, ...rest }) => {
  return (
    <Container {...rest}>
      <Switch onClick={() => onClick(!active)} on={active} />
      <LightActiveS> {active ? "On" : "Off"}</LightActiveS>
    </Container>
  );
};

export default LightActiveCell;
