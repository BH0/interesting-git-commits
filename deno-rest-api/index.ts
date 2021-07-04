import { Application, Router } from "https://deno.land/x/oak/mod.ts"; 
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts"; 
import { saveMessage } from "./save-message.js";
const port: number = 8000; 
const app = new Application();

const router = new Router(); 

router.get("/messages", async (ctx) => {
  const text:string = await Deno.readTextFile('data.json'); 
  const messages:object = JSON.parse(text); 
  ctx.response.body = JSON.stringify(messages); 
}); 

router.get("/messages/:message/:source", async (ctx) => {
   const messages = await readJSONFile("data.json"); 
  interface Message {
    readonly message: undefined | string; 
    readonly source: undefined | string; 
  } 
  const message: Message = { 
    message: ctx.params.message, 
    source: ctx.params.source
  } 

  const newMessages = await saveMessage(message, messages); 
  console.log(newMessages); 
  ctx.response.body = JSON.stringify(newMessages); 
}); 

async function readJSONFile (filepath: string) { 
   const text:string = await Deno.readTextFile(filepath); 
   const messages:object = JSON.parse(text); 
   return messages; 
 }
 
app.use(router.allowedMethods()); 
app.use(oakCors()); 
app.use(router.routes()); 

app.addEventListener("listen", () => {
  console.log(`listening ${port}`); 
}); 

await app.listen({ port }); 
