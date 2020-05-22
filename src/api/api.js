import request from './axios';

export function query(files) {
  return request({
    url: 'query',
    method: 'post',
    data: files
  })
}
export function search(file) {
  return request({
    url: 'search',
    method: 'post',
    data: file
  })
}

