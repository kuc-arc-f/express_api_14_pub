import LibConfig from '../config';
require('dotenv').config();
//const pg = require("pg");
import LibPg from './LibPg';

const LibPost = {
  /**
  * getItems
  * @param
  *
  * @return
  */   
  getItems :async function(req: any){
    try {
      let posts: any[] = [];
      const body = req.body;
      if(body.siteId === undefined) {
        console.error("error getItems, siteId is nothing");
        throw new Error('Error , getItems');
      }
      const siteId = Number(body.siteId);
console.log(siteId);
      const text = `
       SELECT * FROM public."Post" 
       WHERE "siteId" = ${siteId} ORDER BY id DESC LIMIT 500
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
//      console.log(res.rows);
      posts = res.rows;
      return posts;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },    
  /**
  * getItems
  * @param
  *
  * @return
  */  
  getItem :async function(id: number){
    try {
      const text = `
      SELECT * FROM public."Post" where id = ${id}
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      const data = res.rows[0];
//      console.log(data);
      return data;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem:' +err);
    }    
  },
  /**
  *
  * @param
  *
  * @return
  */    
  addTask :async function(req: any){
    try {
//console.log(LibConfig.OK_CODE);
console.log(req.body);
      const body = req.body;
      const text = `
      INSERT INTO public."Task" (title, content, "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, 0, current_timestamp, current_timestamp) RETURNING *
      `;      
      const values = [body.title, body.content ]
//console.log(text);
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result 
      };
//      return res.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTask: '+ err);
    }    
  },
  updateTask :async function(args: any){
  },  
  deleteTask :async function(args: any){
  },             
}
export default LibPost;
