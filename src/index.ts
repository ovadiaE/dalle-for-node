import {generateTaskObject, generateAuthHeader, fetchImage} from './helpers';
import axios from 'axios';

const url = 'https://labs.openai.com/api/labs';

/** 
    Creates a task using prompt and token
    Args:
        bearerToken - authentication
        prompt - prompt for image
    returns:
        id of task created
*/
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

/*
    Driver for fetching image
    Larger process so logic was placed into helper functions.
    Args:
        BearerToken - authentication
        taskID - ID of task where image will be requested from
*/
export const getImages = async (bearerToken:string, taskID:string) => {
    
    let image = await fetchImage(bearerToken, taskID);
    
    return image
  
}

/** 
    Get number of credits left on user's account
    Args:
        bearerToken - authentication
*/
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