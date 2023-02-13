import axios from "axios";
const instance = axios.create({
  data: null,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
