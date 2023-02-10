import express from "express";

const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", (req, res) => {
  res.send({ postExists: true });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
