import { exit } from 'process';
import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';
const SEARCH_MAX_RECORD = 500;
//
const LibBookMark = {
  /**
  * getItems
  * @param
  *
  * @return object
  */  
  getItems :async function(req: any): Promise<any>
  {
    try {
      const retArr = { ret: LibConfig.NG_CODE, data: {}}
console.log(req.body);
      const body = req.body;      
      const text = `
      SELECT public."ChatPost".id
      ,public."ChatPost"."chatId"
      ,public."ChatPost"."userId"
      ,public."ChatPost"."createdAt"
      ,public."ChatPost"."updatedAt"
      ,public."User".id as "UserId"
      ,public."User".name as "UserName"
      ,public."ChatPost".body as "Body"
      ,public."BookMark"."createdAt" as "BookMarkCreatedAt"
      ,public."Chat".name as "ChatName"
      ,public."BookMark".id as "BookMarkId"
      FROM public."ChatPost"
      LEFT OUTER JOIN public."User" ON
      (public."User".id = public."ChatPost"."userId")
      LEFT OUTER JOIN public."BookMark" ON
      (public."BookMark"."chatPostId" = public."ChatPost"."id")
      LEFT OUTER JOIN public."Chat" ON
      (public."Chat".id = public."ChatPost"."chatId")  
      WHERE public."BookMark"."chatId" = ${body.chatId}
      AND public."BookMark"."userId" = ${body.userId}
      ORDER BY public."BookMark".id DESC LIMIT ${SEARCH_MAX_RECORD}
      `;
      const result = await LibPg.get(text);
//console.log(result);
      retArr.ret = LibConfig.OK_CODE;
      retArr.data = result;
      return retArr;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },
  /**
  * search
  * @param
  *
  * @return object
  */  
   search: async function(req: any): Promise<any>
   {
     try {
     } catch (err) {
       console.error(err);
       throw new Error('Error , search:' +err);
     }          
   },  

  /**
  * getItem
  * @param id: number
  *
  * @return Promise<any>
  */    
  getItem :async function(id: number): Promise<any>
  {
    try {
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem:' +err);
    }    
  },
  /**
  * create
  * @param req: any
  *
  * @return object
  */   
  create :async function(req: any): Promise<any>
  {
    try {
      const body = req.body;
console.log(req.body);
//return;
      const text = `
      INSERT INTO public."BookMark" ("userId", "chatId", "chatPostId", "createdAt", "updatedAt") 
      VALUES($1, $2, $3, current_timestamp, current_timestamp) RETURNING *
      `;  
    const values = [body.userId, body.chatId, body.chatPostId]
    const result = await LibPg.execute(text, values);
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , create: '+ err);
    }    
  },
  updateTask :async function(args: any){
  },
  /**
  * delete
  * @param req: any
  *
  * @return object
  */    
  delete :async function(req: any): Promise<any>
  {
    try {
//console.log(req.body);
      const body = req.body;
      const text = `
      DELETE FROM public."BookMark" WHERE id = $1
      RETURNING *
      `;  
    const values = [body.id]
    const result = await LibPg.execute(text, values);
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , delete: '+ err);
    }      
  },             
}
export default LibBookMark;
