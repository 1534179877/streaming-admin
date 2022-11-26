import ajax from './ajax'
export const getAll = () => ajax('/lives')
export const editLive = data => ajax('/live', data, 'post')
export const deleteLive = _id => ajax('/live/delete', {_id}, 'post')
