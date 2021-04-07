import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getData = () => axios.get(baseUrl).then(response => response.data)


export default { getData }