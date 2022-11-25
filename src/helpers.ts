export const generateTaskObject = (prompt:string) => {
   
    const taskObject = {
        task_type: "text2im",     
        prompt: {
            caption: prompt,
            batch_size: 4
        }
    }
    
    return taskObject;
}

export const generateAuthHeader = (bearerToken:string) => {
    
    const authHeader = {
        headers: {
            'Authorization': `Bearer sess-${bearerToken}`
        }
    }
    return authHeader;
}