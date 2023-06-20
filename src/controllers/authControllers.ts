import logger from "../utils/logger.js";
import redis from "../utils/redis.js";
import jwt from "jsonwebtoken";
import { verify } from "../utils/verify.js";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
class AuthControllers {
  constructor() {}

  accToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      interface decodeInterface {
        email: string;
      }
      const { token } = req.body;
      const decoded: any = jwt.decode(token);

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
          const decoded: any = jwt.decode(result);
          const token = jwt.sign(
            {
              email: decoded.email,
            },
            process.env.JWT_SECRET!,
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
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(401).send({ error: error.message });
    }
  };
}

export default AuthControllers;
