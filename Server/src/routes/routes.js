import express from 'express'
import { createTextAndSaveToDb } from '../controllers/ModelControllers.js';
import { getContentByPassword } from '../controllers/ModelControllers.js';
import { getInfo } from '../controllers/ModelControllers.js';

const router=express.Router();

router.post("/create-text",createTextAndSaveToDb)
router.get("/get-info",getInfo)
router.post("/get-content",getContentByPassword)


export default router;