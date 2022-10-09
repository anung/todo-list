const { todos, activities } = require("../models");

const getAllData = async (req, res, next) => {
  try {
    const limit = req.query.limit ? req.query.limit : 10;
    const { activity_group_id } = req.query;
    const whereData = activity_group_id
      ? { activity_group_id: activity_group_id }
      : null;
    const findAll = await todos.findAll({
      where: whereData,
      limit: limit,
    });
    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: findAll,
    });
  } catch (e) {
    next(e);
  }
};

const getOneData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findData = await todos.findByPk(id);
    if (!findData) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: findData,
    });
  } catch (e) {
    next(e);
  }
};

const createData = async (req, res, next) => {
  try {
    const { ...createData } = req.body;
    const findActivity = await activities.findByPk(
      createData.activity_group_id
    );
    if (!findActivity) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with activity_group_id ${createData.activity_group_id} Not Found`,
        data: {},
      });
    }
    const insertData = await todos.create({
      ...createData,
      is_active: true,
      priority: "very-high",
    });
    return res.status(201).json({
      status: "Success",
      message: "Success",
      data: insertData,
    });
  } catch (e) {
    next(e);
  }
};

const updateData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findData = await todos.findByPk(id);
    if (!findData) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });
    }
    if (req.body.activity_group_id) {
      const findActivity = await activities.findByPk(
        req.body.activity_group_id
      );
      if (!findActivity) {
        return res.status(404).json({
          status: "Not Found",
          message: `Activity with activity_group_id ${req.body.activity_group_id} Not Found`,
          data: {},
        });
      }
    }
    const updateData = await findData.update(req.body);
    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: updateData,
    });
  } catch (e) {
    next(e);
  }
};

const deleteData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findData = await todos.findByPk(id);
    if (!findData) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        data: {},
      });
    }
    await findData.destroy();
    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: {},
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllData,
  getOneData,
  createData,
  updateData,
  deleteData,
};
