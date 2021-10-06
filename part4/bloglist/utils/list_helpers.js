const logger = require('../utils/logger')

const dumy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    let totalLikes = 0
    for(let index in blogs){
        totalLikes += blogs[index].likes
    }
    return totalLikes
}

const favouriteBlog = blogs => {
    let maxLike
    for(let blog of blogs){
        if(maxLike?.likes === undefined){
            maxLike = blog
        }
        if(blog.likes > maxLike?.likes){
            maxLike = blog
        }
    }
    return maxLike
}


module.exports = {
    dumy,
    totalLikes,
    favouriteBlog
}