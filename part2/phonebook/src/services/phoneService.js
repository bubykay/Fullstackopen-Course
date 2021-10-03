import axios from 'axios'

const baseURL = '/api/persons'


const getAll = () => {
    const request = axios({
        method: "GET",
        baseURL
    })
     return request.then(response=>{
         return response.data
     })
}


const addToPhonebook = data => {
    const request = axios({
        method: "POST",
        baseURL,
        data
    })
    return request.then(response=>response.data)
}

const deletePerson = data => {
    const request = axios({
        method: "DELETE",
        baseURL: `${baseURL}/${data.id}`
    })
    return request.then(response=>response)
}

const updatePerson = data => {  
    const request = axios({
        method: "PUT",
        baseURL,
        data
    })
    return request.then(response=>{

        return response.data
    })
}

const noteServices = {
    getAll, 
    addToPhonebook, 
    deletePerson,
    updatePerson
}
export default noteServices