import axios from "axios";

const baseURL = "https://localhost:7095/api/";

export var api = axios.create({
  baseURL,
});
