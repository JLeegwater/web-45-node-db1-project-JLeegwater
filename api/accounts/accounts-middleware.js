const db = require("../../data/db-config");
const Account = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    next({
      message: "name and budget are required",
      status: 400,
    });
  } else if (typeof name !== "string") {
    next({
      message: "name of account must be a string",
      status: 400,
    });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({
      message: "name of account must be between 3 and 100",
      status: 400,
    });
  } else if (typeof budget !== "number" || isNaN(budget)) {
    next({
      message: "budget of account must be a number",
      status: 400,
    });
  } else if (budget < 0 || budget > 1000000) {
    next({
      message: "budget of account is too large or too small",
      status: 400,
    });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const accName = await db("accounts")
    .where("name", req.body.name.trim())
    .first();
  if (accName) {
    next({
      message: "that name is taken",
      status: 400,
    });
  } else {
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      next({
        message: "account not found",
        status: 404,
      });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};
