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

// UPDATE MOVIE
export const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: "Invalid movie ID" })

        const body = req.body

        await prisma.movie.update({
            where: { id },
            data: {
                judul: body.judul,
                genre: body.genre,
                durasi: body.durasi
            }
        })

        res.json({
            message: 'Movie updated successfully'
        })
    } catch (error) {
        if (error.code === 'P2025') {
             return res.status(404).json({ message: "Movie not found" })
        }
        res.status(500).json({
            message: error.message
        })
    }
}

// DELETE MOVIE
export const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: "Invalid movie ID" })

        await prisma.movie.delete({
            where: { id }
        })

        res.json({
            message: 'Movie deleted successfully'
        })
    } catch (error) {
        if (error.code === 'P2025') {
             return res.status(404).json({ message: "Movie not found" })
        }
        res.status(500).json({
            message: error.message
        })
    }
}