import React, { Component } from "react";
import { Table, Input, Txt, Container } from "rendition";
import styled from "styled-components";
import LightApiClient from "../clients/LightApiClient";
import "react-toggle-switch/dist/css/switch.min.css";
import BrightnessEditor from "./BrightnessEditor";
import LightActiveCell from "./LightActiveCell";

const StyledContainer = styled(Container)`
  display: inline-flex;
  width: 100%;
`;
const StyledTable = styled(Table)`
  margin: 10px;
`;
const BrightnessEditorContainer = styled.div`
  background: #3b3c41;
  border-radius: 5px;
  margin: 10px;
`;
const LightNameInput = styled(Input)`
  border: 0px;
  background: none;
`;

class LightTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      switch: false,
      activeRow: null
    };
  }

  activeRowEle = null;

  componentDidMount() {
    this.getLights();
  }
  getLights() {
    return LightApiClient.getDevices().then(res => {
      let activeRow = null;
      if (this.state.activeRow) {
        activeRow = res.data.find(r => r.id === this.state.activeRow.id);
      }
      this.setState({ data: res.data, activeRow });
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
  updateLightPercentage(brightness) {
    const newLight = { ...this.state.activeRow, brightness };
    return LightApiClient.updateDevice(newLight).then(() => this.getLights());
  }
  setActiveColumn(row, ele) {
    // set active row when selected
    // similar to onchecked but we do not want the check boxes
    const rowEle = ele.currentTarget.parentElement;
    if (this.activeRowEle) {
      this.activeRowEle.dataset.checked = false;
    }
    rowEle.dataset.checked = true;
    this.activeRowEle = rowEle;
    this.setState({ activeRow: row });
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
          <LightActiveCell
            active={active}
            onClick={value => this.updateLightState(value, row)}
          />
        )
      },
      {
        field: "brightness",
        label: "Brightness",
        render: percentage => <Txt>{percentage}%</Txt>
      }
    ];
  }
  renderLightEditor(row) {
    if (!row) {
      return;
    }
    const { brightness } = row;
    return (
      <BrightnessEditorContainer>
        <BrightnessEditor
          percentage={brightness}
          onChange={p => this.updateLightPercentage(p)}
        />
      </BrightnessEditorContainer>
    );
  }
  render() {
    return (
      <StyledContainer>
        <StyledTable
          columns={this.getColumns()}
          data={this.state.data}
          rowKey="id"
          onRowClick={(v, e) => this.setActiveColumn(v, e)}
        />
        {this.renderLightEditor(this.state.activeRow)}
      </StyledContainer>
    );
  }
}

export default LightTable;
