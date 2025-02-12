import { reverseString } from './util/reverseString' 

test('reverseString',()=>{
  expect(reverseString('hello')).toBe('olleh')
  expect(reverseString('')).toBe('')
  expect(reverseString('↖↞↷')).toBe('↷↞↖')
})