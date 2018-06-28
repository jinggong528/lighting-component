import { lightApi } from "../config";

export default {
  getDevices() {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `http://${lightApi.host}:${lightApi.port}/api/v1/device`);
      xhr.onload = () => {
        if ([200, 304].indexOf(xhr.status) >= 0) {
          const data = JSON.parse(xhr.responseText);
          res(data);
        } else {
          rej("Error Occurred!");
        }
      };
      xhr.send();
    });
  },

  getDevice(id) {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `http://${lightApi.host}:${lightApi.port}/api/v1/device/${id}`
      );
      xhr.onload = () => {
        if ([200, 304].indexOf(xhr.status) >= 0) {
          const data = JSON.parse(xhr.responseText);
          res(data);
        } else {
          rej("Error Occurred!");
        }
      };
      xhr.send();
    });
  },
  updateDevice({ id, brightness, active, name }) {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "PATCH",
        `http://${lightApi.host}:${lightApi.port}/api/v1/device/${id}`
      );
      xhr.setRequestHeader("content-type", "application/json");
      xhr.onload = () => {
        if ([200, 304].indexOf(xhr.status) >= 0) {
          const data = JSON.parse(xhr.responseText);
          res(data);
        } else {
          rej("Error Occurred!");
        }
      };
      xhr.send(
        JSON.stringify({
          data: {
            brightness,
            active,
            name
          }
        })
      );
    });
  }
};
