
const usernames = new Set();

export const recordUsernames = (username) => {
    usernames.add(username); 
}

export const getUsernames = () => {
    return usernames;
}

export const resetUsernames = () => {
    usernames.clear();
    console.log(usernames)
}