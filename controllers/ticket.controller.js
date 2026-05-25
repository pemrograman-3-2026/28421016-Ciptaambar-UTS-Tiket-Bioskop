import { prisma } from "../lib/prisma.js"

export const createTicket = async (req, res) => {
    try {
        const body = req.body

        // Cek apakah user ada
        const user = await prisma.user.findUnique({
            where: { id: body.userId }
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        // Cek apakah movie ada
        const movie = await prisma.movie.findUnique({
            where: { id: body.movieId }
        })
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }

        await prisma.ticket.create({
            data: {
                userId: body.userId,
                movieId: body.movieId,
                jumlahTiket: body.jumlahTiket,
                tanggalPesan: body.tanggalPesan ? new Date(body.tanggalPesan) : new Date()
            }
        })

        res.json({
            message: "Ticket created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getMyTickets = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId)

        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" })
        }

        const tickets = await prisma.ticket.findMany({
            where: { userId },
            include: {
                movie: true
            }
        })

        res.json(tickets)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateTicket = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: "Invalid ticket ID" })

        const body = req.body

        // Cek apakah user ada (opsional jika userId diupdate)
        if (body.userId) {
            const user = await prisma.user.findUnique({
                where: { id: body.userId }
            })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
        }

        // Cek apakah movie ada (opsional jika movieId diupdate)
        if (body.movieId) {
            const movie = await prisma.movie.findUnique({
                where: { id: body.movieId }
            })
            if (!movie) {
                return res.status(404).json({ message: "Movie not found" })
            }
        }

        await prisma.ticket.update({
            where: { id },
            data: {
                userId: body.userId,
                movieId: body.movieId,
                jumlahTiket: body.jumlahTiket,
                tanggalPesan: body.tanggalPesan ? new Date(body.tanggalPesan) : undefined
            }
        })

        res.json({
            message: "Ticket updated successfully"
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Ticket not found" })
        }
        res.status(500).json({
            message: error.message
        })
    }
}

export const removeTicket = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)) return res.status(400).json({ message: "Invalid ticket ID" })

        await prisma.ticket.delete({
            where: { id }
        })

        res.json({
            message: "Ticket deleted successfully"
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Ticket not found" })
        }
        res.status(500).json({
            message: error.message
        })
    }
}