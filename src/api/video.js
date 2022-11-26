import ajax from './ajax'
export const getAll = () => ajax('/videos')
export const editVideo = data => ajax('/video', data, 'post')
export const deleteVideo = _id => ajax('/video/delete', {_id}, 'post')

