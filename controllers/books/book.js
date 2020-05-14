const shortid = require("shortid");
const db = require("../../db");

module.exports.getList = (req, res) =>
  res.render("books/index", { books: db.get("books").value() });

module.exports.create = (req, res) => {
  res.render("books/add");
};

module.exports.postCreate = (req, res) => {
  let name = req.body.name;
  let description = req.body.description;
  db.get("books")
    .push({ id: shortid.generate(), name: name, description: description })
    .write();
  res.redirect("/books");
};

module.exports.update = (req, res) => {
  let id = req.params.id;
  let book = db.get("books").find({ id: id }).value();
  res.render("books/update", {
    book,
  });
};

module.exports.postUpdate = (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  db.get("books").find({ id: id }).assign({ name: name }).write();
  res.redirect("/books");
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("books").remove({ id: id }).write();
  res.redirect("/books");
};
