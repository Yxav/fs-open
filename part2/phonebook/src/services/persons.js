import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getData = () => axios.get(baseUrl).then(response => response.data)

const saveData = (person) => axios.post(baseUrl, person).then(response => response.data);

const updateData = (id, data) => axios.put(`${baseUrl}/${id}`, data).then(response => response.data)

const deleteData = (id) => axios.delete(`${baseUrl}/${id}`).then(response => response.data)




export default { getData, saveData, deleteData, updateData }