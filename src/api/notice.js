import ajax from './ajax'
export const getAll = () => ajax('/notices')
export const editNotice = data => ajax('/notice', data, 'post')
export const deleteNotice = _id => ajax('/notice/delete', {_id}, 'post')

