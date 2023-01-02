const express = require('express');
const router = express.Router();
import LibPage from '../lib/LibPage';

/*****************************
Task -index
******************************/
router.post('/index', async function(req: any, res: any) {
  try {
    const items = await LibPage.getItems(req);
//console.log(items);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/******************************** 
*Show
*********************************/
router.get('/show/:id', async function(req: any, res: any) {
  try {
    console.log(req.params.id  );
    const result = await LibPage.getItem(Number(req.params.id));
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
});

export default router;