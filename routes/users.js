const express = require("express");
const routes = express.Router();
const User = require("../models/Users");

routes.get("/login", (req, res) => res.render("login"));
routes.get("/register", (req, res) => res.render("register"));

// Register handle

routes.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  //check required fields
  if ((!name, !email, !password, !password2)) {
    errors.push({ msg: "please fill in all required fields" });
  }

  //check password field
  if (password !== password2) {
    errors.push({ msg: "passwords do not match" });
  }

  //check pass length
  if (password.length < 6) {
    errors.push({ msg: "password must be at least 6" });
  } else {
    //validation pass
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "user exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;

            newUser
              .save()
              .then((user) => {
                req.flash('success_msg', 'You are now registered and can log in')
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

module.exports = routes;
