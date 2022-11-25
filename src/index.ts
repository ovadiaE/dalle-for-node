const axios = require('axios');

import {generateTaskObject, generateAuthHeader} from './helpers';

const url = 'https://labs.openai.com/api/labs';

export const generateTaskID = async (bearerToken:string, prompt:string) => {
    
    const taskObject = generateTaskObject(prompt);
    const authHeader = generateAuthHeader(bearerToken);

    try
    {
        let task = await axios.post(`${url}/tasks`, taskObject, authHeader);
        return(task.data.id);
    } 
    catch(error)
    {
        return error;
    }
}

export const getImage = async (taskID:string, bearerToken:string) => {

    const authHeader = generateAuthHeader(bearerToken);
    console.log(authHeader);
   
    try 
    {
        let image =  await axios.get(`${url}/tasks/${taskID}`, authHeader);
        return image;
    }
    catch(error)
    {
        return error    
    }
  }