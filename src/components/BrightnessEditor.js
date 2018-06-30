import React, { Component } from "react";
import styled from "styled-components";
import { CircularSlider } from "./circular-slider";
import DisplayBrightness from "./DisplayBrightness";
import { defaultProps } from "recompose";
import PropTypes from "prop-types";

const StyledCircularSlider = styled(CircularSlider)``;
const StyledDisplayBrightness = styled(DisplayBrightness)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Editor = styled.div`
  position: relative;
  height: ${props => props.size}px
  width: ${props => props.size}px
`;

export default class BrightnessEditor extends Component {
  state = { end: 405, start: 135 };

  changeBrightness(angle) {
    const percentage = this.setPercentage(angle);
    this.props.onChange(percentage);
  }
  setAngle(percentage) {
    const { end, start } = this.state;
    const range = end - start;
    return (percentage * range) / 100 + start;
  }
  setPercentage(angle) {
    const { end, start } = this.state;
    const range = end - start;
    const percentage = Math.round((100 * (angle - start)) / range);
    if (percentage < 0) {
      return 0;
    }
    if (percentage > 100) {
      return 100;
    }
    return Math.round((100 * (angle - start)) / range);
  }
  render() {
    const { percentage } = this.props;
    const angle = this.setAngle(percentage);
    return (
      <Editor size={this.props.size * 2}>
        <StyledCircularSlider
          r={this.props.size}
          angle={angle}
          arcEnd={this.state.end}
          arcStart={this.state.start}
          onMove={angle => this.changeBrightness(angle)}
        />
        <StyledDisplayBrightness
          size={this.props.size}
          percentage={percentage}
        />
      </Editor>
    );
  }
}

BrightnessEditor.PropTypes = {
  size: PropTypes.number,
  percentage: PropTypes.number,
  onChange: PropTypes.func
};

BrightnessEditor.defaultProps = {
  size: 200,
  percentage: 50,
  onChange: () => {}
};
