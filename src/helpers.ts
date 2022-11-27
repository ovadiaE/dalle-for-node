import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthHeader, imageStatus, imageObject, imageString } from './types';

const url = 'https://labs.openai.com/api/labs';

/*
    Error handling for axios errors
    Args:
        axios error
*/
export const handleError = (error:unknown) => {
    if (axios.isAxiosError(error)) {
        return error.message;
    }
    else {
        return 'an unexpected error occured';
    }
} 

/*
    Creates object to be sent in post request for generateTask
    Args:
        prompt
*/
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

/*
    Creates authentication header object
    Args:
        bearerToken
*/
export const generateAuthHeader = (bearerToken:string) => {
    
    const authHeader:AuthHeader = {
        headers: {
            'Authorization': `Bearer sess-${bearerToken}`,
        },
    };
    return authHeader;
}

/*
    Get Request and error handling for retrieving images
    Args:
        taskID 
        auth header containing bearerToken
*/
const requestImages = async (taskID:string, authHeader:object) => {

    try
    {
        let response =  await axios.get<AxiosResponse>(`${url}/tasks/${taskID}`, authHeader);
        return response.data as unknown as imageStatus
    }
    catch(error)
    {
        console.log(error);
        return handleError(error);
    }
}

/*
    Stores image links returned from requestImages into array
    Args
        json data returned from requestImages
*/
const storeImageLinks = (images:imageObject[]) => {
    let imageLinksArray:string[] = [];
    
    // i is 4 because 4 images are created in a single task - if batch_sze is changed in generateTaskObject be sure to edit value here too
    for(let i=0; i < 4; i++)
    {
    }

}

/*
    Polls endpoint until status is no longer pending
    Args:
        bearerToken - authentication 
        auth header containing bearerToken
    returns
        array of image links or error message
*/
export const fetchImage = async (bearerToken:string, taskID:string) => {
    
        const authHeader = generateAuthHeader(bearerToken);
        let imageLinksArray:string[] = [];

        let image = await requestImages(taskID, authHeader) as imageStatus
        
        while(image.status === "pending")
        {
            image = await requestImages(taskID, authHeader) as imageStatus;
        }
        
        if(!image.generations)
        {
            return 'Failed to generate image';
        }

        // i is 4 because 4 images are created in a single task - if batch_sze is changed in generateTaskObject be sure to edit value here too
        for(let i=0; i < 4; i++)
        {
            imageLinksArray[i] = image?.generations?.data[i].generation.image_path
        }

        return imageLinksArray
}