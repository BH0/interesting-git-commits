// import { jobs } from './_data.js';
import { jobs } from './_data';
import nodeFetch from "node-fetch"; 
import { json } from 'body-parser';

export function get(req, res, next) {
  nodeFetch('http://localhost:8000/messages')
  .then(response => response.json())
  .then(messages => {
    console.log(messages); 
    res.end(JSON.stringify(messages)); 
  });
}
