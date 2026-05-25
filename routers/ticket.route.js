import express from "express"
import { createTicket, getMyTickets, updateTicket, removeTicket } from "../controllers/ticket.controller.js"

const router = express.Router()

router.post('/ticket', createTicket)
router.get('/my-ticket/:userId', getMyTickets)
router.put('/ticket/:id', updateTicket)
router.delete('/ticket/:id', removeTicket)

export default router