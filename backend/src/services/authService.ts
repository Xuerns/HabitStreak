import pool from "../db";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Generate Token
const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "2h" });
};

// Services  Register
export const registerUser = async (data: any) => {
  if (!data.name || !data.gmail || !data.password) {
    throw { status: 400, message: "Data tidak lengkap" };
  }

  const [rowsUser]: any = await pool.execute(
    "SELECT id FROM user WHERE gmail = ?",
    [data.gmail],
  );

  if (rowsUser.length > 0) {
    throw { status: 401, message: "Akun sudah terdaftar" };
  }

  await pool.execute(
    "INSERT INTO user (NAME, gmail, PASSWORD) VALUES (?, ? , ?)",
    [data.name, data.gmail, await bcrypt.hash(data.password, 10)],
  );

  return { message: "Berhasil Register" };
};

// Services Login
export const loginUser = async (data: any) => {
  if (!data.gmail || !data.password) {
    throw { status: 400, message: "Data tidak lengkap" };
  }

  const [dataUser] = await pool.execute("SELECT * FROM user WHERE gmail = ?", [
    data.gmail,
  ]);

  if (dataUser.length === 0) {
    throw { status: 401, message: "Akun belum terdaftar" };
  }
  const user = dataUser[0];
  const isMatch = await bcrypt.compare(data.password, user.PASSWORD);

  if (!isMatch) {
    throw { status: 401, message: "Password invalid" };
  }

  return {
    message: "berhasil login",
    token: generateToken(user.id),
  };
};
