import React, { Component } from "react";
import { Provider } from "rendition";
import "./App.css";

import LightTable from "./components/LightTable";

class App extends Component {
  render() {
    return (
      <Provider>
        <LightTable />
      </Provider>
    );
  }
}

export default App;
