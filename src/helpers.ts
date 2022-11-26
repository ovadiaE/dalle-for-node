const axios = require('axios');

const url = 'https://labs.openai.com/api/labs';

export const generateTaskObject = (prompt:string) => {
   
    const taskObject = {
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
            'Authorization': `Bearer sess-${bearerToken}`,
        }
    };
    return authHeader;
}

export const checkImageStatus = async (taskID:string, authHeader:object) => {
    try
    {
        let image = await axios.get(`${url}/tasks/${taskID}`, authHeader);
    }
    catch(error)
    {
        console.log('image status')   
    }
}
