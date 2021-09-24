import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios({
        method: "GET",
        baseURL
    })
     return request.then(response=>response.data)
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
        baseURL: `${baseURL}/${data.id}`,
        data
    })
    return request.then(response=>{
        console.log(response.data)
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