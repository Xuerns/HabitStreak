import type { Request, Response } from "express";
import pool from "../db";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (id: string) => {
    return jwt.sign({id}, JWT_SECRET, {expiresIn: '1h'})
}


// Register
export const register = async (req: Request, res: Response) => {
    const {name, gmail, password} = req.body

    try {
        if (!name || !gmail || !password) {
            return res.status(400).json({message: "Data tidak lengkap"})
        }

        const [rows]: any = await pool.execute(
            "SELECT id FROM user WHERE gmail = ?", [gmail]
        )

        if (rows.length > 0) {
            return res.status(401).json({message: "Akun sudah terdaftar"})
        }

        await pool.execute(
            'INSERT INTO user (NAME, gmail, PASSWORD) VALUES (?, ?, ?)', [name, gmail, await bcrypt.hash(password, 10)]
        )
        return res.status(200).json({message: "Berhasil Register"})
    } catch (error: any) {
        res.status(500).json({message: "Server Error", Error: error})
    }
}

// Login
export const login = async (req: Request, res: Response) => {
    const { gmail, password } = req.body

    try {
        if (!gmail || !password) {
            return res.status(400).json({message: "Data tidak lengkap"})
        }

        const [rows]:  any = await pool.execute(
            "SELECT * FROM user WHERE gmail = ?", [gmail]
        )

        if (rows.length === 0) {
            return res.status(401).json({message: "Akun Belum terdaftar"})
        }

        const user = rows[0]

        const isMatch = await bcrypt.compare(password, user.PASSWORD)
        
        if (!isMatch) {
            return res.status(401).json({message: "Password invalid"})
        }

        res.status(200).json({message: "Berhasil Login", token: generateToken(user.id)})
    } catch {
        res.status(500).json({message: "Server Error"})
    }
}
 