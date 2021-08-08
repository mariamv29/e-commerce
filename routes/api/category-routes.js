const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        // be sure to include its associated Products
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCatergoryData) => res.json(dbCatergoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCatergoryData) => {
      if (!dbCatergoryData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      } // be sure to include its associated Products
      res.json(dbCatergoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCatergoryData) => res.json(dbCatergoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCatergoryData) => {
      if (!dbCatergoryData[0]) {
        res.status(404).json({ message: "No category found with this id" });
      }
      res.json(dbCatergoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCatergoryData) => {
      if (!dbCatergoryData) {
        res.status(404).json({ message: "No category found with this id" });
      }
      res.json(dbCatergoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
