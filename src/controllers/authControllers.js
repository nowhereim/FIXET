const logger = require("../../utils/logger");
const AssetServices = require("../services/assetServices");
const redis = require("../../utils/redis");
const jwt = require("jsonwebtoken");
import { verify } from "../../utils/verify";

class AssetControllers {
  constructor() {
    this.assetServices = new AssetServices();
  }

  accToken = async (req, res, next) => {
    try {
      const { token } = req.body;
      const decoded = jwt.decode(token);
      const resultacc = await redis.get(`${decoded.email}acc`);
      if (resultacc !== token)
        return res.status(401).send({
          errorMessage: "The last issued token does not match.",
        });

      const result = await redis.get(`${decoded.email}ref`);
      if (result === null) {
        return res.status(401).send({
          errorMessage: "The refresh token has expired. Please login again.",
        });
      } else {
        const refreshVerify = verify(result);
        if (refreshVerify === false) {
          return res.status(401).send({
            errorMessage: "The refresh token has expired. Please login again.",
          });
        } else {
          const decoded = jwt.decode(result);
          const token = jwt.sign(
            {
              email: decoded.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "30s",
            },
          );
          redis.set(`${decoded.email}acc`, token);
          return res.status(200).send({
            token: token,
          });
        }
      }
    } catch (error) {
      logger.error(error.name);
      logger.error(error.message);
      return res.status(401).send({
        errorname: error.name,
        message: error.message,
      });
    }
  };
}

module.exports = AssetControllers;
