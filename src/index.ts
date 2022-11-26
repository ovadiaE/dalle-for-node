import {generateTaskObject, generateAuthHeader, fetchImage} from './helpers';
import axios from 'axios';

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
        return error; 
    }
}

export const getImages = async (bearerToken:string, taskID:string) => {
    
    try
    {
        let image = await fetchImage(bearerToken, taskID);
        return image;
    }
    catch(error)
    {
        return error;
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