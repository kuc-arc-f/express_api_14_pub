const express = require('express');
const router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/test', function(req: any, res: any) {
  try {
//console.log(process.env.API_KEY);
    res.send({ name: "GET /test-222" });
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
