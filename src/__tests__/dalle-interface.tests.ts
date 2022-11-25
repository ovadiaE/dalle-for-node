import { generateImage } from '../index'

test('generate Image', () => {
    expect(generateImage('Carl', 'carl')).toBe('Hello Carl');
});