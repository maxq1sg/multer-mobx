const express = require("express");
const app = express();
const path = require("path");
const postsRouter = require("./routes/posts.route");
const testRouter = require("./routes/test.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "uploads")));

app.use("/api/posts", postsRouter);
app.use("/api/test", testRouter);

app.listen(5000, () => {
  console.log("server is running");
});
