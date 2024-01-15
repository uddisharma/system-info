const express = require("express");
const cors = require("cors");
const si = require("systeminformation");
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
app.listen(4000, () => {
  console.log("running");
});
