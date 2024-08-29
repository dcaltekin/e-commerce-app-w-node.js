import { verifyPassword, generateToken } from "../config/auth.js";
import { findUserByUsername, createUser } from "../models/User.js";
import logger from "../config/logger.js";

export async function loginUser(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const { username, password } = JSON.parse(body);
    try {
      const storedUser = await findUserByUsername(username);

      if (
        storedUser &&
        (await verifyPassword(password, storedUser.password, storedUser.salt))
      ) {
        const token = generateToken({ id: storedUser._id, username });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ token }));

        logger.info(`Başarıyla oturum açıldı. Kullanıcı adı: ${username}`);
      } else {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Kullanıcı adı veya şifre yanlış" }));

        logger.warn(`Başarısız giriş denemesi. Kullanıcı adı: ${username}`);
      }
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Internal Server Error" }));

      logger.error(
        `Giriş yapmaya çalışırken hatayla karşılaşıldı. Username: ${username}, Error: ${err.message}`
      );
    }
  });
}

export async function registerUser(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const { username, password } = JSON.parse(body);
    try {
      const existingUser = await findUserByUsername(username);

      if (existingUser) {
        res.statusCode = 409;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Kullanıcı zaten kayıtlı!" }));

        logger.warn(
          `Başarısız kayıt olma isteği. Kullanıcı zaten var: ${username}`
        );
        return;
      }

      await createUser(username, password);
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Kullanıcı başarıyla oluşturuldu." }));
      logger.info(
        `Kullanıcı başarıyla oluşturuldu. Kullanıcı adı: ${username}`
      );
    } catch (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({ message: "Registration failed. Please try again." })
      );
      logger.error(`Hata. Kullanıcı adı: ${username}, Hata: ${err.message}`);
    }
  });
}
