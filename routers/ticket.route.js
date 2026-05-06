import express from "express"
import { createTicket, getMyTickets } from "../controllers/ticket.controller.js"

const router = express.Router()

router.post('/ticket', createTicket)
router.get('/my-ticket/:userId', getMyTickets)

export default router