import { doubleCount } from './util/doubleCount' 

test('doubleCount',()=>{
  expect(doubleCount(2)).toBe(4)
  expect(doubleCount(-5)).toBe(-10)
  expect(doubleCount(0)).toBe(0)
})