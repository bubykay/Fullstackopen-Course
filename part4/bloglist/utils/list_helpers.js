/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const dumy = () => 1;

const totalLikes = (blogs) => {
    let totalLike = 0;
    for (const index in blogs) {
        totalLike += blogs[index].likes;
    }
    return totalLike;
};

const favouriteBlog = (blogs) => {
    let maxLike;
    for (const blog of blogs) {
        if (maxLike?.likes === undefined) {
            maxLike = blog;
        }
        if (blog.likes > maxLike?.likes) {
            maxLike = blog;
        }
    }
    return maxLike;
};

module.exports = {
    dumy,
    totalLikes,
    favouriteBlog,
};
