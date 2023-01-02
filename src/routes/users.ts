const express = require('express');
const router = express.Router();
import LibUser from '../lib/LibUser';

/*****************************
Task -index
******************************/
router.get('/index', async function(req: any, res: any) {
  try {
//    const items = await LibTask.getItems();
//    res.json(items);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/******************************** 
*  todos Show
*********************************/
router.get('/show/:id', async function(req: any, res: any) {
  try {
    console.log(req.params.id  );
    res.json({});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/**
* add
* @param req: any
*
* @return object
*/ 
router.post('/add', async function(req: any, res: any) {
  try {
    const result = await LibUser.addUser(req);
console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* login
* @param req: any
*
* @return object
*/ 
router.post('/login', async function(req: any, res: any) {
  try {
    const result = await LibUser.validUser(req);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;