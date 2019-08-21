const setLocalStorage = (key,value)=>{
    localStorage.setItem(key,JSON.stringify(value));
};

const getLocalStorage = (key)=>{
    return JSON.parse(localStorage.getItem(key));
};

const removeLocalStorage = (key)=>{
    localStorage.removeItem(key);
};

const removeAllLocalStorage = ()=>{
    localStorage.clear();
};

const setSessionStorage = (key,value)=>{
    sessionStorage.setItem(key,JSON.stringify(value));
};

const getSessionStorage = (key)=>{
    return JSON.parse(sessionStorage.getItem(key));
};

const removeSessionStorage = (key)=>{
    sessionStorage.removeItem(key);
};

const removeAllSessionStorage = ()=>{
    sessionStorage.clear();
};

module.exports = {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    removeAllLocalStorage,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    removeAllSessionStorage
};