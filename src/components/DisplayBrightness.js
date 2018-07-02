import React from "react";
import Sun from "react-icons/lib/fa/sun-o";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  color: ${({ disabled }) => (disabled ? "grey" : "white")};
`;

const StyleSun = styled(Sun)`
  color: ${({ disabled }) => (disabled ? "grey" : "#fec400")};
  font-size: 20px;
`;
const PercentSign = styled.span`
  font-size: 20px;
`;

const DisplayBrightness = ({ percentage = 0, disabled = true, ...props }) => (
  <Container disabled={disabled} {...props}>
    <StyleSun disabled={disabled} />
    <h1>
      {" "}
      {percentage}
      <PercentSign> %</PercentSign>{" "}
    </h1>
    <p> Brightness </p>
  </Container>
);

export default DisplayBrightness;
