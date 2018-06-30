import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: black;
`;
const PercentageEditor = ({ percentage, onChange }) => (
  <Container>{percentage}%</Container>
);

export default PercentageEditor;
