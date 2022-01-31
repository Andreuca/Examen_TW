const express = require("express");
const router = require("./routes");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')))
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});