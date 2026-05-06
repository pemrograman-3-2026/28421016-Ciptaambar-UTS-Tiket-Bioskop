import express from "express"
import { create, getAll } from "../controllers/movie.controller.js"

const router = express.Router()

router.post('/create', create)
router.get('/movies', getAll)

export default router