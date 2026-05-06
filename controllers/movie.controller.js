import { prisma } from "../lib/prisma.js"

// CREATE MOVIE
export const create = async (req, res) => {
    try {
        const body = req.body

        await prisma.movie.create({
            data: {
                judul: body.judul,
                genre: body.genre,
                durasi: body.durasi
            }
        })

        res.json({
            message: 'Movie created successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// GET ALL MOVIES
export const getAll = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany()

        res.json(movies)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}