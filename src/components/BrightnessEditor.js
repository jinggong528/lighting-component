import React, { Component } from "react";
import styled from "styled-components";
import { CircularSlider } from "./circular-slider";

const StyledCircularSlider = styled(CircularSlider)``;

const Editor = styled.div`
  background: #3b3c41;
`;

export default class BrightnessEditor extends Component {
  state = { angle: 135, end: 405, start: 135 };

  changeBrightness(angle) {
    if (angle < this.state.end && angle > this.state.start) {
      this.setState({ angle });
    }
  }
  render() {
    return (
      <Editor>
        <StyledCircularSlider
          angle={this.state.angle}
          arcEnd={this.state.end}
          arcStart={this.state.start}
          onMove={value => this.changeBrightness(value)}
        />
      </Editor>
    );
  }
}
