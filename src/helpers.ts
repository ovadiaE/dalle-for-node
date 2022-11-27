import axios from 'axios';

const url = 'https://labs.openai.com/api/labs';

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
    
    const authHeader:object = {
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
        let response =  await axios.get(`${url}/tasks/${taskID}`, authHeader);
        console.log(JSON.stringify(response))
        return response; 
    }
    catch(error)
    {
        console.log(error);
        return handleError(error);
    }
}
/*
    Polls endpoint until status is no longer pending
    Args:
        bearerToken - authentication 
        auth header containing bearerToken
*/
export const fetchImage = async (bearerToken:string, taskID:string) => {
    
        const authHeader = generateAuthHeader(bearerToken);

        let image = await requestImages(taskID, authHeader);
        
        if(image == undefined) {
            return image
        } 
}