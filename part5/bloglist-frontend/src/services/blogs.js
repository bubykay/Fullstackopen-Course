import axios from 'axios'
const baseURL = '/api/blogs'

let token = null

const setToken = credential => {
  token = `Bearer ${credential}`
}

const getAll = async() => {
  if(token){
    try {
      const resource = await axios({
        baseURL,
        method: "GET",
        headers : {Authorization: token}
      })
      return resource.data
    } catch (error) {
      console.log(error)
    }
  }
}

const create = async(data) => {
  const response = await axios({
    baseURL,
    method: "POST",
    data,
    headers: {Authorization: token}
  })
  return response.data
}

const obj = {getAll, setToken, create} 
export default  obj