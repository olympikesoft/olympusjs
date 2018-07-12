import express, { Router } from 'express';
import { getAllUser } from '../controllers/UserController';
import {insertMessages, loginFirebase } from '../controllers/firebase/main';


// Initialize the router
const router = Router();

// Handle /movies.json route with index action from movies controller

router.post('/register', getAllUser);

router.post('/login', getAllUser);

router.get('/insert', getAllUser);

router.get('/all', getAllUser);

router.post('/firebase/register', insertMessages);
router.post('/firebase/login', loginFirebase);


export default router;
