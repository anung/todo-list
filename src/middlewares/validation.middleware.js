const validation = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    const message = error.details[0].message;
    return res.status(400).json({
      status: "Bad Request",
      message: message.toString().replace(/"/g, ""),
      data: {},
    });
  }
};

module.exports = validation;
