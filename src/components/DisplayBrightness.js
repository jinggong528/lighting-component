import React, { Component } from "react";
import Sun from "react-icons/lib/fa/sun-o";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  text-align: center;
  color: white;
`;

const StyleSun = styled(Sun)`
  color: #fec400;
  font-size: 20px;
`;

export default class DisplayBrightness extends Component {
  render() {
    return (
      <Container {...this.props}>
        <StyleSun />
        <h1> {this.props.percentage}% </h1>
        <p> Brightness </p>
      </Container>
    );
  }
}

DisplayBrightness.PropTypes = {
  percentage: PropTypes.number
};

DisplayBrightness.defaultProps = {
  percentage: 0
};
