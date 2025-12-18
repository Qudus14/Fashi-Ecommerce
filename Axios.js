import axios from "axios";

const instance = axios.create({
  baseURL: "https://real-time-product-search.p.rapidapi.com",
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": "b69689afe6msh644a34a44e73cf1p194223jsn54a65869c476",
    "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
  },
});

export default instance;
// 0636af3412mshc4ade4adc482543p108907jsnfc18649145fd
// b69689afe6msh644a34a44e73cf1p194223jsn54a65869c476
// dfc93e44d5msh1a2d1e11bc243fcp1dd2acjsnc2e4dbde6a0c
