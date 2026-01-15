import axios from "axios";

const instance = axios.create({
  baseURL: "https://real-time-product-search.p.rapidapi.com",
  headers: {
    "Content-Type": "application/json",
    // "x-rapidapi-key": "2fa901984bmsh8c7209fbf0ec285p1c8df4jsncccc802b7045",
    "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
  },
});

export default instance;
// 0636af3412mshc4ade4adc482543p108907jsnfc18649145fd
// b69689afe6msh644a34a44e73cf1p194223jsn54a65869c476
// dfc93e44d5msh1a2d1e11bc243fcp1dd2acjsnc2e4dbde6a0c
// 972215308emsh171b462be9f9e18p12ab07jsn5915560ec507
// cf7320b6d2msh8734c6317a1bd89p1c468ejsn4b0d0f62e427
// c33309897bmshd54c1f6871f1eaap1f9b20jsn1b4baab8df5f
// 2fa901984bmsh8c7209fbf0ec285p1c8df4jsncccc802b7045
