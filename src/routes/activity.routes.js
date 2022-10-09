const router = require("express").Router();
const Joi = require("joi");
const {
  getAllData,
  getOneData,
  createData,
  updateData,
  deleteData,
} = require("../controllers/activity.controller");
const validation = require("../middlewares/validation.middleware");
const schema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "title cannot be null",
  }),
  email: Joi.string(),
});

router.get("/", getAllData);
router.get("/:id", getOneData);
router.post("/", validation(schema), createData);
router.patch("/:id", validation(schema), updateData);
router.delete("/:id", deleteData);

module.exports = router;
