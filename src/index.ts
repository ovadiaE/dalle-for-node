const axios = require('axios');

import {generateTaskObject, generateAuthHeader} from './helpers';

const url = 'https://labs.openai.com/api/labs';

export const generateImage = async (bearerToken:string, prompt:string) => {
    
    const taskObject = generateTaskObject(prompt);
    const authHeader = generateAuthHeader(bearerToken);

    try
    {
        let task = await axios.post(`${url}/tasks`, taskObject, authHeader);
        let image = await checkImageStatus(task.data.id, bearerToken);
        
        return image.data;
    }
    catch(error)
    {
        return error;
    }
};

const getImage = async (taskID:string, bearerToken:string) => {

    const authHeader = generateAuthHeader(bearerToken);
   
    try 
    {
        let imageObject = axios.get(`${url}/tasks/${taskID}`, authHeader);
        return imageObject;
    }
    catch(error)
    {
        return error;
    }
  }

  const checkImageStatus = async (taskID:string, bearerToken:string) => {         
        
    let image = await getImage(taskID, bearerToken)

    while("pending" === image.data.status)
    {
        image = await getImage(taskID, bearerToken);

        setTimeout(() => {console.log('waiting')}, 2000)
    }
   
    return image;
}
