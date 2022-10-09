const router = require("express").Router();
const Joi = require("joi");
const {
  getAllData,
  getOneData,
  createData,
  updateData,
  deleteData,
} = require("../controllers/todo.controller");
const validation = require("../middlewares/validation.middleware");
const schema = Joi.object({
  activity_group_id: Joi.number().required().messages({
    "any.required": "activity_group_id cannot be null",
    number: "activity_group_id must be number",
  }),
  title: Joi.string().required().messages({
    "any.required": "title cannot be null",
  }),
  priority: Joi.string(),
  status: Joi.string(),
});

router.get("/", getAllData);
router.get("/:id", getOneData);
router.post("/", validation(schema), createData);
router.patch("/:id", updateData);
router.delete("/:id", deleteData);

module.exports = router;
