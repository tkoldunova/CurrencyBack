import Router from 'express'
import Requests from './requests.js'

//const blackMarcket = require('./blackMarkerParser.js').BlackMarketParser
//var express = require('express')
const router = Router();

router.get('/blackMarcket', Requests.getBlackMarketRequest)
router.get('/banks', Requests.getBanksRequest)
router.get('/nationalBanks', Requests.getNationalBanksRequest)
router.get('/nearMe', Requests.getPossitionRequest)
router.get('/bankPosition', Requests.getBankPositions)

export default router;