import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma.js";

export const register = async (req, res) => {
    try {
        const body = req.body;

        const isEmailExist = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (isEmailExist) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashPassword = bcrypt.hashSync(body.password, 12);

        await prisma.user.create({
            data: {
                nama: body.nama,
                email: body.email,
                password: hashPassword
            }
        });

        res.json({
            message: "Register Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const body = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordValid = bcrypt.compareSync(
            body.password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }

        const { password: userPassword, ...userData } = user;

        res.json({
            message: "Login Successfully",
            user: userData
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};