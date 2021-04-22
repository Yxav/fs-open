import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog, user) => {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      'Authorization': token 
    }
  })
  return response.data
}

export default { getAll, create, setToken}