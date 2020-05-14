const express = require("express");
const bookRoute = require("./routers/books");
const userRouter = require("./routers/users/index");
const transaction = require("./routers/transactions/index");

const PORT = 3000;
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => res.render("index"));

app.use("/books", bookRoute);
app.use("/users", userRouter);
app.use("/transactions", transaction);

const listener = app.listen(PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
