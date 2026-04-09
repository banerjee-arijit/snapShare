import express from 'express'
import { createTextAndSaveToDb } from '../controllers/ModelControllers.js';
import { getContentByPassword } from '../controllers/ModelControllers.js';
import { getInfo } from '../controllers/ModelControllers.js';

const router=express.Router();

// create text and save to DB
router.post("/create-text",createTextAndSaveToDb)
// getInfo of the current User
router.get("/get-info",getInfo)

// get content by password
router.post("/get-content",getContentByPassword)


export default router;