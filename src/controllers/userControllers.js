const UserServices = require("../services/userServices");
const bcrypt = require("bcryptjs");
const logger = require("./../../utils/logger");

class userControllers {
  constructor() {
    this.userServices = new UserServices();
  }

  signUp = async (req, res, next) => {
    try {
      const { email, password, name, agreePi, company } = req.body;
      if (agreePi !== true)
        return res.status(400).send({ error: "개인정보 수집에 동의해주세요." });
      const pass = await bcrypt.hash(password, 10);
      const userIdCheck = await this.userServices.validation(email, password);
      if (userIdCheck.error) return res.status(400).send(userIdCheck);
      const result = await this.userServices.createUser(
        email,
        pass,
        name,
        agreePi,
        company,
      );
      if (result.error) return res.status(400).send(result);
      return res.status(200).send({ msg: "success" });
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error });
    }
  };
  authMail = async (req, res, next) => {
    try {
      const { email, name } = req.body;
      //정규식으로 email 형식 체크 yup으로 대체 필요성 못느낌
      const regExp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (!regExp.test(email)) {
        return res.status(400).send({ error: "이메일 형식이 아닙니다." });
      }
      const userIdCheck = await this.userServices.authMail(email, name);
      if (userIdCheck.error) return res.status(400).send(userIdCheck);
      return res.status(200).send({
        msg: `${email}로 인증번호가 발송되었습니다. 3분후 발송된 인증번호는 폐기됩니다.`,
      });
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error.message });
    }
  };

  authCode = async (req, res, next) => {
    try {
      const { email, code } = req.body;
      const userIdCheck = await this.userServices.authCode(email, code);
      if (userIdCheck.error) return res.status(400).send(userIdCheck);
      return res.status(200).send({ msg: "인증되었습니다." });
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error.message });
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userServices.checkUser(email, password);
      if (user.error) return res.status(400).send(user);
      const token = await this.userServices.createToken(email);
      return res.status(200).send({ token });
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error });
    }
  };

  signout = async (req, res, next) => {
    try {
      const userEmail = res.locals.userEmail;
      const user = await this.userServices.signout(userEmail);
      if (user.error) return res.status(400).send(user);
      return res.status(200).send({ msg: "로그아웃 되었습니다." });
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error });
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { email, ...rest } = req.body;
      const user = await this.userServices.updateUser(email, rest);
      if (user.error) {
        return res.status(400).send(user);
      }
      return res.status(200).send({ user });
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error });
    }
  };

  patchEmail = async (req, res, next) => {
    try {
      const { email, newemail } = req.body;
      const user = await this.userServices.patchEmail(email, newemail);
      if (user.error) {
        return res.status(400).send(user);
      }
      return res.status(200).send({ user });
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error });
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userServices.deleteUser(email, password);
      if (user.error) {
        return res.status(400).send(user);
      }
      return res.status(200).send({ user });
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error });
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userServices.resetPassword(email, password);
      if (user.error) {
        return res.status(400).send(user);
      } else {
        return res.status(200).send(user);
      }
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error.message });
    }
  };

  readUser = async (req, res, next) => {
    try {
      const { id } = req.query;
      const user = await this.userServices.readUser(id);
      if (user.error) {
        return res.status(400).send(user);
      }
      return res.status(200).send({ user });
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send({ error: error });
    }
  };

  checkUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!password) {
        const checkMail = await this.userServices.checkMail(email);
        if (checkMail.error) return res.status(400).send(checkMail);
        return res.status(200).send(checkMail);
      } else {
        const user = await this.userServices.checkPassword(email, password);
        if (user.error) {
          return res.status(400).send(user);
        }
        return res.status(200).send({ user });
      }
    } catch (error) {
      logger.error(error.message);
      logger.error(error.name);
      return res.status(400).send(error.message);
    }
  };
}

module.exports = userControllers;
