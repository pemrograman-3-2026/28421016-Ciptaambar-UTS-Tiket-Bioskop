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