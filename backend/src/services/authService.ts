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
    throw {
      status: 400,
      message: "Please fill in all required fields.",
      titleMessage: "Required Fields Missing",
    };
  }

  const [rowsUser]: any = await pool.execute(
    "SELECT id FROM user WHERE gmail = ?",
    [data.gmail],
  );

  if (rowsUser.length > 0) {
    throw {
      status: 401,
      message:
        "This account is already registered. Please go to the login page to continue.",
      titleMessage: "Account Already Exists",
    };
  }

  await pool.execute(
    "INSERT INTO user (NAME, gmail, PASSWORD) VALUES (?, ? , ?)",
    [data.name, data.gmail, await bcrypt.hash(data.password, 10)],
  );

  return {
    titleMessage: "Registration Successful",
    message: "Your account has been created successfully. You can now log in.",
  };
};

// Services Login
export const loginUser = async (data: any) => {
  if (!data.gmail || !data.password) {
    throw {
      status: 400,
      message: "Please fill in all required fields.",
      titleMessage: "Required Fields Missing",
    };
  }

  const [dataUser] = await pool.execute("SELECT * FROM user WHERE gmail = ?", [
    data.gmail,
  ]);

  if (dataUser.length === 0) {
    throw {
      status: 401,
      message:
        "This account is not registered yet. Please go to the register page to continue.",
      titleMessage: "Account Doesn't Exists",
    };
  }
  const user = dataUser[0];
  const isMatch = await bcrypt.compare(data.password, user.PASSWORD);

  if (!isMatch) {
    throw {
      status: 401,
      message: "The password you entered is incorrect. Please try again.",
      titleMessage: "Incorrect Password",
    };
  }

  return {
    titleMessage: "Welcome Back",
    message: "You have logged in successfully.",
    token: generateToken(user.id),
  };
};
