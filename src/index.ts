import express from "express";

import runUnauthenticatedBrowser from "./utils/runUnauthenticatedBrowser.js";

const app = express();
const port = 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", (req, res) => {
  const { url } = req.body as { url: string };

  runUnauthenticatedBrowser(url)
    .then((postExists) => res.status(200).json({ postExists }))
    .catch((err: Error) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
