const express = require("express");
const bodyParser = require("body-parser");
const trie = require("./scripts/analyze-data");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/predictor", async (req, res) => {
  res.send(trie.find(req.body.text));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
