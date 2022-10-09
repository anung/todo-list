const { activities } = require("../models");

const getAllData = async (req, res, next) => {
  try {
    const limit = req.query.limit ? req.query.limit : 10;
    const findAll = await activities.findAll({
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
    const findOne = await activities.findByPk(id);
    if (!findOne) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });
    }
    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: findOne,
    });
  } catch (e) {
    next(e);
  }
};

const createData = async (req, res, next) => {
  try {
    const { ...createData } = req.body;

    const insertData = await activities.create(createData);

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
    const findData = await activities.findByPk(id);
    if (!findData) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data: {},
      });
    }

    const update = await findData.update(req.body);
    return res.status(200).json({
      status: "Success",
      message: "Success",
      data: update,
    });
  } catch (e) {
    next(e);
  }
};

const deleteData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findData = await activities.findByPk(id);
    if (!findData) {
      return res.status(404).json({
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
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
