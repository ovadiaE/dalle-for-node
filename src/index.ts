const axios = require('axios');

import {generateTaskObject, generateAuthHeader, checkImageStatus} from './helpers';

const url = 'https://labs.openai.com/api/labs';

export const generateTaskID = async (bearerToken:string, prompt:string) => {
    
    const authHeader = generateAuthHeader(bearerToken);
    const taskObject = generateTaskObject(prompt);

    try
    {
        let task = await axios.post(`${url}/tasks`, taskObject, authHeader);
        return task.data.id
    } 
    catch(error)
    {
        console.log(error)   
    }
}

export const getImage = async (taskID:string, bearerToken:string) => {

    const authHeader = generateAuthHeader(bearerToken);   
    
    try 
    {
        checkImageStatus(taskID, authHeader);
    }
    catch(error)
    {
        console.log("get image")
    }
  }

  export const getCredits = async (bearerToken:string) => {
    
    const authHeader = generateAuthHeader(bearerToken);   
    
    try
    {
        let credits = await axios.get(`${url}/billing/credit_summary`, authHeader);
        return credits.data;

    }
    catch(error)
    {
        return error;
    }
  }