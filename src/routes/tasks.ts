const express = require('express');
const router = express.Router();
import LibTask from '../lib/LibTask';

/*****************************
Task -index
******************************/
router.get('/index', async function(req: any, res: any) {
  try {
    const items = await LibTask.getItems();
//console.log(items);
    res.json(items);
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
    const result = await LibTask.getItem(Number(req.params.id));
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});
/*****************************
Task -add
******************************/
router.post('/add', async function(req: any, res: any) {
  try {
    const result = await LibTask.addTask(req);
//console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
// getItem

export default router;