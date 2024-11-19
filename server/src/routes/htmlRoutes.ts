import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

console.log(__dirname); // DELETE THIS - logging to be able to run in terminal ////////////////////
// TODO: Define route to serve index.html

export default router;
