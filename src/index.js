import * as Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import { routes } from "./Routes/index.js";
import hapiAuthJwt2 from "hapi-auth-jwt2";
import { validate, validate2 } from "./Helper/auth.js";
dotenv.config();
const servers = async () => {
  const server = Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: true,
    },
  });
  await server.register(hapiAuthJwt2);
  server.auth.strategy("jwt", "jwt", {
    key: process.env.SECRET_KEY,
    validate: validate,
  });
  server.auth.strategy("jwt2", "jwt", {
    key: process.env.SECRET_KEY,
    validate: validate2,
  });
  routes?.map((e) => server.route(e));
  server.decorate("toolkit", "success", function (data) {
    return this.response(data?.result).code(data?.statusCode);
  });
  server.decorate("toolkit", "error", function (data) {
    return this.response({ message: data.message }).code(
      data?.statusCode ? data?.statusCode : 500
    );
  });
  return server;
};

servers()
  .then(async (s) => {
    await s.start();
    console.log(`server running.....`);
  })
  .catch((e) => {
    throw e;
  });
