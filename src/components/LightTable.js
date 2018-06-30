import React, { Component } from "react";
import { Table, Input, Txt, Container } from "rendition";
import styled from "styled-components";
import LightApiClient from "../clients/LightApiClient";
import Switch from "react-toggle-switch";
import PercentageEditor from "./PercentageEditor";
import "react-toggle-switch/dist/css/switch.min.css";
import BrightnessEditor from "./BrightnessEditor";

const StyledContainer = styled(Container)`
  // display: inline-flex;
  width: 200%;
`;
const StyledTable = styled(Table)`
  padding: 5px;
  margin: 30px;
`;
const LightNameInput = styled(Input)`
  border: 0px;
  background: none;
`;
const LightActiveP = styled.span`
  padding-left: 10px;
`;

const LightActiveCell = styled.div`
  display: inline-flex;
  align-items: center;
`;
const StyledPercentageEditor = styled(PercentageEditor)`
  width: 50%;
  flex: 1 1;
`;

class LightTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      switch: false
    };
  }

  componentDidMount() {
    this.getLights();
  }
  getLights() {
    return LightApiClient.getDevices().then(res => {
      this.setState({ data: res.data });
    });
  }
  updateLightName(name, row) {
    const newLight = { ...row, name };
    return LightApiClient.updateDevice(newLight).then(() => this.getLights());
  }
  updateLightState(active, row) {
    const newLight = { ...row, active };
    return LightApiClient.updateDevice(newLight).then(() => this.getLights());
  }
  getColumns() {
    return [
      {
        field: "name",
        label: "Room",
        sortable: true,
        render: (name, row) => (
          <LightNameInput
            type="text"
            value={name}
            onChange={event => this.updateLightName(event.target.value, row)}
          />
        )
      },
      {
        field: "active",
        label: "State",
        render: (active, row) => (
          <LightActiveCell>
            <Switch
              onClick={() => this.updateLightState(!active, row)}
              on={active}
            />
            <LightActiveP> {active ? "On" : "Off"}</LightActiveP>
          </LightActiveCell>
        )
      },
      {
        field: "brightness",
        label: "Brightness",
        render: percentage => (
          <Txt tooltip={{ placement: "right", text: "Test", trigger: "click" }}>
            {percentage}%
          </Txt>
        )
      }
    ];
  }
  render() {
    return (
      <StyledContainer>
        <StyledTable
          columns={this.getColumns()}
          data={this.state.data}
          rowKey="id"
        />
        <BrightnessEditor />
      </StyledContainer>
    );
  }
}

export default LightTable;
