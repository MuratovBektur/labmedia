import axios from "axios";
const instance = axios.create({
  data: null,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export default instance;
