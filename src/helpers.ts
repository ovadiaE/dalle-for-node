import axios from 'axios';
import { imageResponse } from './types';
const url = 'https://labs.openai.com/api/labs';


export const generateTaskObject = (prompt:string) => {
   
    const taskObject:object = {
        task_type: "text2im",     
        prompt: {
            caption: prompt,
            batch_size: 4
        }
    };
    
    return taskObject;
}

export const generateAuthHeader = (bearerToken:string) => {
    
    const authHeader = {
        headers: {
            Authorization: `Bearer sess-${bearerToken}`,
            Accept: 'application/json'
        },
    };
    return authHeader;
}

const requestImages = async (bearerToken:string, taskID:string) => {
    
    const authHeader = generateAuthHeader(bearerToken);
    try
    {
        return await axios.get<imageResponse>(`${url}/tasks/${taskID}`, authHeader); 
    }
    catch(error)
    {
        console.log(error);
    }
}

export const fetchImage = async (bearerToken:string, taskID:string) => {
    
    const refreshIntervalId = setInterval(async () => {
        
        let image = await requestImages(bearerToken, taskID)
        if(image == undefined) {
            return image
        }
        console.log(image.data)
        switch(image.data.status)
        {
            case "succeeded":
                clearInterval(refreshIntervalId);
                return image;
            case "rejected":
                clearInterval(refreshIntervalId);
                return image;
            case "pending":
                console.log(image.status)
            case "default":
                console.log(image.data)
        }
    }, 2000);  
}