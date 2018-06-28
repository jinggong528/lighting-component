# Lighting Component

## Usage

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "rendition";

import { Lighting } from "./lighting";

ReactDOM.render(
  <Provider>
    <Lighting />
  </Provider>,
  document.getElementById("root")
);
```

## Assumptions

- I assume this will be a component that will intergrate with the main resin application that will already have navigation bar and buttons with page title implemented.
- I assume that the column `Room` is the descriptive name for the light bulb.
- I assume I will need to used native XMLHttpRequest in order to interact with backend api
