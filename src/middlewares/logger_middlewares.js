const morgan = require("morgan");
const logger = require("../../utils/logger");
const dotenv = require("dotenv");

dotenv.config();

const format = () => {
  const result = process.env.NODE_ENV === "production" ? "combined" : "dev";
  return result;
};

const stream = {
  write: (message) => {
    logger.info(
      message.replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        "",
      ),
    );
  },
};
const skip = (_, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.ststusCode < 399;
  }
  return false;
};

const morganMiddleware = morgan(format(), { stream, skip });

module.exports = morganMiddleware;
