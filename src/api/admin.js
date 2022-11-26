import ajax from './ajax'
export const login = data => ajax('/login', data, 'post')
