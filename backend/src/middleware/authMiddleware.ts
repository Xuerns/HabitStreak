import type { Request, Response, NextFunction } from "express";
import jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_SECRET as string;

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // validasi ketika tidak ada token / authheader tidak dikirim
  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ada" });
  }

  // Pisahkan token menggunakan split
  let token = authHeader.split(" ")[1]; 

  // validasi jika token tidak valid
  if (!token) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  try {
    // validasi apakah token === JWT SECRET
    const decoded = jwt.verify(token, JWT_TOKEN);
    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token Invalid / Expired" });
  }
}

export = authMiddleware;
