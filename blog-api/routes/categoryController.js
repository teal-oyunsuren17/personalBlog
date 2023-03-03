const express = require("express");
const { v4: uuidv4, v4 } = require("uuid");
// const { connection } = require("./config/mysql");
const router = express.Router();

router.get("/", (req, res) => {
  connection.query(`SELECT * FROM category `, function (err, results, fields) {
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM category where id=? `,
    [id],
    function (err, results, fields) {
      res.json(results[0]);
    }
  );
});

router.post("/", (req, res) => {
  const { title } = req.body;
  connection.query(
    `insert into category values (?,?)`,
    [v4(), title],
    function (err, results, fields) {
      res.sendStatus(201);
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `delete from category where id=?`,
    [id],
    function (err, results, fields) {
      res.sendStatus(201);
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  connection.query(
    `update category set title=? where id=?`,
    [title, id],
    function (err, results, fields) {
      res.json({ updatedId: id });
    }
  );
});

module.exports = {
  categoryRouter: router,
};
