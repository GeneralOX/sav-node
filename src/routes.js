
const express = require('express');

const authRouter = express.Router();
const interRouter = express.Router();
const deviceRouter = express.Router();
const dischRouter = express.Router();
const clientRouter = express.Router();

// AUTH
const AUTHCONTROLLER = require('./controllers/auth');
authRouter.post('/register', AUTHCONTROLLER.register);
authRouter.post('/login', AUTHCONTROLLER.login);

// INTERVENTION
const INTERCONTROLLER = require('./controllers/intervention');

interRouter.post('/etatPDF', INTERCONTROLLER.etatWithPDF);
interRouter.post('/etat', INTERCONTROLLER.etatIntervention);
interRouter.post('/close', INTERCONTROLLER.closeIntervention);
interRouter.post('/create', INTERCONTROLLER.createIntervention);
interRouter.post('/search', INTERCONTROLLER.searchIntervention);
interRouter.post('/pending', INTERCONTROLLER.pendingIntervention);
interRouter.post('/return', INTERCONTROLLER.returnIntervention);
interRouter.get('/details', INTERCONTROLLER.detailsIntervention);
//&&& SWAP
interRouter.post('/create-swap', INTERCONTROLLER.swapIntervention);
interRouter.post('/details-swap', INTERCONTROLLER.detailsSwap);
interRouter.get('/pending-swap', INTERCONTROLLER.pendingSwap);



//DEVICE
const DEVICECONTROLLER = require('./controllers/device');
deviceRouter.get('/search', DEVICECONTROLLER.getDeviceByIMEI);

//DISCHARGE
const DISCHCONTROLLER = require('./controllers/discharge');
dischRouter.post('/create', DISCHCONTROLLER.createDischarge);
dischRouter.post('/swap', DISCHCONTROLLER.createSwapDischarge);

// AVAILABLE CLIENT
const CLIENTCONTROLLER = require('./controllers/client');
const uploadFileMiddleware = require('./middleware/upload');
clientRouter.post('/create', CLIENTCONTROLLER.createAvailableClient);
clientRouter.get('/get', CLIENTCONTROLLER.getAvailableClient);


module.exports = {
    authRouter,
    interRouter,
    deviceRouter,
    dischRouter,
    clientRouter
}