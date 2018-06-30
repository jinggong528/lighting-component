import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  polarToCartesian,
  circularArc,
  calcAngleDiff
} from "./helpers/geometryHelpers";
import { Dragger } from "./components/Dragger";

export const SquareSVG = styled.svg`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
`;

export class CircularSlider extends Component {
  center = {
    x: this.props.r,
    y: this.props.r
  };
  size = 2 * this.props.r;
  r = this.props.r - 20;
  absoluteContainerPosition = () => {
    if (!this.containerNode) {
      return null;
    }
    const { left: x, top: y } = this.containerNode.getBoundingClientRect();
    return { x, y };
  };
  handleDrag = ({ x, y }) => {
    const { x: fiducialX, y: fiducialY } = polarToCartesian(
      0,
      0,
      this.r,
      this.props.angle
    );
    const deltaTheta = calcAngleDiff(x, y, fiducialX, -fiducialY);
    const newAngle = this.props.angle + deltaTheta;
    this.props.onMove(newAngle);
  };
  render() {
    const { arcStart, arcEnd, angle } = this.props;
    const r = this.r;
    const relCenterPos = this.center;
    const radialPosition = polarToCartesian(0, 0, r, angle);
    return (
      <SquareSVG
        innerRef={x => {
          this.containerNode = x;
        }}
        size={this.size}
        className={this.props.className}
      >
        <defs>
          <linearGradient id="grad">
            <stop stopColor="#796327" />
            <stop offset="50%" stopColor="#fedc00" />
          </linearGradient>
        </defs>
        <path
          d={circularArc(relCenterPos.x, relCenterPos.y, arcStart, arcEnd, r)}
          fill="transparent"
          stroke="url(#grad)"
          strokeWidth={15}
          strokeLinecap="round"
        />
        <path
          d={circularArc(relCenterPos.x, relCenterPos.y, angle, arcEnd, r)}
          fill="transparent"
          stroke="grey"
          strokeWidth={15}
          strokeLinecap="round"
        />

        <Dragger
          absoluteContainerFunc={this.absoluteContainerPosition}
          color={"#fec400"}
          outColor={"white"}
          onMove={this.handleDrag}
          radialPosition={radialPosition}
          relCenterPos={relCenterPos}
          radius={16}
        />
      </SquareSVG>
    );
  }
}

CircularSlider.propTypes = {
  angle: PropTypes.number,
  arcEnd: PropTypes.number,
  arcStart: PropTypes.number,
  color: PropTypes.string,
  onMove: PropTypes.func,
  r: PropTypes.number
};

CircularSlider.defaultProps = {
  angle: 200,
  arcEnd: 360,
  arcStart: 180,
  color: "darkseagreen",
  onMove: () => {},
  r: 100
};
