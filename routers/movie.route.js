import express from "express"
import { create, getAll, update, remove } from "../controllers/movie.controller.js"

const router = express.Router()

router.post('/create', create)
router.get('/movies', getAll)
router.put('/update/:id', update)
router.delete('/delete/:id', remove)

export default router