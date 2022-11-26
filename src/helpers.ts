import axios from 'axios';
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
            'Authorization': `Bearer sess-${bearerToken}`,
        },
    };
    return authHeader;
}

const requestImages = async (bearerToken:string, taskID:string) => {
    
    const authHeader = generateAuthHeader(bearerToken);
   
     return await axios.get(`${url}/tasks/${taskID}`, authHeader); 
}

export const fetchImage = async (bearerToken:string, taskID:string) => {
    
    const refreshIntervalId = setInterval(async () => {
        
        let image = await requestImages(bearerToken, taskID)

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