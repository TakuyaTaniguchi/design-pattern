import { updateUserProfile } from './util/updateUserProfile' 

const data = {
  id: 1,
  name: 'Taro',
  email: 'hoge@hoge.com'
}

test('updateUserProfile',()=>{

  const updates = {
    id:2,
    name:'Hanako',
    email: 'fuga@fuga.com'
  }

  const updateData = updateUserProfile(data,updates)

  expect(updateData).toEqual({
    id:2,
    name:'Hanako',
    email: 'fuga@fuga.com'
  })
})

test('returns a new object, not the original',()=>{

  const updates = {
    id: 1,
    name: 'Taro',
    email: 'hoge@hoge.com'
  }

  const updateData = updateUserProfile(data,updates)

  console.log(updateData)

  expect(updateData).not.toBe(data)
})