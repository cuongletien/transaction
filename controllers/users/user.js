const shortid = require("shortid");
const db = require("../../db");

module.exports.getList = (req, res) =>
  res.render("users/index", { users: db.get("users").value() });

module.exports.create = (req, res) => {
  res.render("users/add");
};

module.exports.postCreate = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  if (name.length > 30) {
    res.render("users/add", {
      name: "Name is Too Long",
      email,
    });
  }
  db.get("users")
    .push({ id: shortid.generate(), name: name, email: email })
    .write();
  res.redirect("/users");
};

module.exports.update = (req, res) => {
  let id = req.params.id;
  let user = db.get("users").find({ id: id }).value();
  res.render("users/update", {
    user,
  });
};

module.exports.postUpdate = (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  db.get("users").find({ id: id }).assign({ name: name }).write();
  res.redirect("/users");
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("users").remove({ id: id }).write();
  res.redirect("/users");
};
