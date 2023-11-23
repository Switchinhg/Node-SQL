const express = require("express");
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

const userRouter = require("./routes/userRouter")
const tweetsRouter = require("./routes/tweetsRouter")

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* TWEETS */

app.use("/api/tweets", tweetsRouter);

/* USERS */

app.use("/api/users", userRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

