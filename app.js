const express = require("express");
const cors = require("cors");
const si = require("systeminformation");
const axios = require("axios");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", async (req, res) => {
  try {
    const systemData = await si.system();
    const osData = await si.osInfo();
    const deviceInfo = {
      osData,
      systemData,
    };
    return res.send(deviceInfo);
  } catch (error) {
    res.send(error);
  }
});
app.get("/get-ip", (req, res) => {
  axios
    .get("https://surfshark.com/api/v1/server/user")
    .then((resp) => {
      res.json({ data: resp.data, msg: "Data fetched" });
    })
    .catch((err) => {
      res.json({ msg: "Something went wrong", err: err });
    });
});
app.listen(4000, () => {
  console.log("running");
});
