import express from "express";
import { publicRouter } from "../routes/route";

export const web = express()

web.use(express.json())
web.use(publicRouter)