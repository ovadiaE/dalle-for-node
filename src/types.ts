export type imageResponse = {
    json: {
        "object": string;
        "id": string;
        "created": number;
        "task_type": string;
        "status": string;
        "status_information": object,
        "prompt_id": string,
        "generations": {
            "object": string,
            "data": [
                {
                    "id": string,
                    "object": string,
                    "created": number,
                    "generation_type": string,
                    "generation": {
                        "image_path": string
                    },
                    "task_id": string,
                    "prompt_id": string,
                    "is_public": boolean
                },
                {
                    "id": string,
                    "object": string,
                    "created": number,
                    "generation_type": string,
                    "generation": {
                        "image_path": string
                    },
                    "task_id": string,
                    "prompt_id": string,
                    "is_public": boolean
                },
                {
                    "id": string,
                    "object": string,
                    "created": number,
                    "generation_type": string,
                    "generation": {
                        "image_path": string
                    },
                    "task_id": string,
                    "prompt_id": string,
                    "is_public": boolean
                },
                {
                    "id": string,
                    "object": string,
                    "created": number,
                    "generation_type": string,
                    "generation": {
                        "image_path": string
                    },
                    "task_id": string,
                    "prompt_id": string,
                    "is_public": boolean
                }
            ]
        },
        "prompt": {
            "id": string,
            "object": string,
            "created": number,
            "prompt_type": number,
            "prompt": {
                "caption": string
            },
            "parent_generation_id": null
        }   
    }
}