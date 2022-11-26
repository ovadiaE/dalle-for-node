import { generateTaskObject, generateAuthHeader } from '../helpers'

test('generate task object', () => {
    expect(generateTaskObject('Image')).toMatchObject({
        task_type: "text2im",     
        prompt: {
            caption: 'Image',
            batch_size: 4
        }
    });
});

test('generate authHeader', () => {
    expect(generateAuthHeader('DUMMY_BEARER_TOKEN')).toMatchObject({
        headers: {
            "Authorization": "Bearer sess-DUMMY_BEARER_TOKEN",
        }
    });
});