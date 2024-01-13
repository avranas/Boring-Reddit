const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

console.log(path.join(__dirname, "../../build"))
console.log(path.join(__dirname, "../../build/index.html"))
app.use(express.static(path.join(__dirname, "../../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
