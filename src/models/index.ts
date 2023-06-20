import { Sequelize } from "sequelize";
import config from "../config/config.json" assert { type: "json" };

const sequelzie = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: "mysql",
    timezone: "+09:00",
  },
);

export default sequelzie;
