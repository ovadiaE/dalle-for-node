export type imageObject = {
        id: string,
        object: string,
        created: number,
        generation_type: string,
        generation: {
            image_path: string
        }
        task_id: string,
        prompt_id: string,
        is_public: boolean
}

export type imageString = {
    image_path: string
}

export type imageStatus = {
    object: string,
    id: string,
    created: number,
    task_type: string,
    status: string,
    status_information: object,
    prompt_id: string,
    generations?: {
        object: string,
        data: [
            imageObject,
            imageObject,
            imageObject,
            imageObject
        ]
    },
    prompt: {
      id: string,
      object: string,
      created: number,
      prompt_type: string,
      prompt: object,
      parent_generation_id: null
    }
  }
  
  export type AuthHeader = {
    headers: {
        Authorization: string,
    },
  }
