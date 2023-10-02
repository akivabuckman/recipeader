import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import algorithm from "./algorithm.js"



const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.post("/recipe", algorithm)

app.listen(process.env.PORT, () => {
    console.log(`run on port ${process.env.PORT}`);
  });