const shortid = require("shortid");
const db = require("../../db");

module.exports.getList = (req, res) =>
  res.render("transactions/index", {
    transactions: db.get("transactions").value(),
  });

module.exports.create = (req, res) => {
  res.render("transactions/create", {
    books: db.get("books").value(),
    users: db.get("users").value(),
  });
};

module.exports.postCreate = (req, res) => {
  let book = req.body.book;
  let user = req.body.user;
  db.get("transactions")
    .push({
      id: shortid.generate(),
      bookId: book,
      userId: user,
      completed: false,
    })
    .write();
  res.redirect("/transactions");
};

module.exports.detail = (req, res) => {
  let id = req.params.id;
  let transaction = db.get("transactions").find({ id: id }).value();
  if (!transaction) {
    res.status(400).send("Bad Request");
    return;
  }
  let book = db.get("books").find({ id: transaction.bookId }).value();
  let user = db.get("users").find({ id: transaction.userId }).value();
  res.render("transactions/detail", {
    transaction,
    book,
    user,
  });
};

module.exports.update = (req, res) => {
  let id = req.params.id;
  let complete = req.body.checked ? true : false;
  db.get("transactions")
    .find({ id: id })
    .assign({ completed: complete })
    .write();
  res.redirect("/transactions");
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("transactions").remove({ id: id }).write();
  res.redirect("/transactions");
};
