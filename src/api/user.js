import ajax from './ajax'
export const getAll = () => ajax('/users')
export const editUser = data => ajax('/user', data, 'post')
export const deleteUser = _id => ajax('/user/delete', {_id}, 'post')

