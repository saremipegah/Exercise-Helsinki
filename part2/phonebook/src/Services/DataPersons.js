import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = nameObject => {
  const request = axios.post(baseUrl, nameObject)
  return request.then(response => response.data)
}
const update = (id, nameObject) => {
  const request = axios.put(`${baseUrl}/${id}`, nameObject)
  return request.then(response => response.data)
}
const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then((res) => res.data)
}


export default {getAll, create , update , remove }