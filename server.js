const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.static("public"));

app.get("/api/check-erp", async (req, res) => {
  const url = "http://trial-ris.rapigra.co.id/";

  const start = Date.now();
  let status = "OFFLINE";

  try {
    const response = await fetch(url);
    status = response.ok ? "ONLINE" : "ERROR";
  } catch (err) {
    status = "OFFLINE";
  }

  const responseTime = Date.now() - start;

  res.json({ url, status, responseTime });
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});