import axios from 'axios'
import qs from 'qs'
import util from '../util'

let Interface = 'http://lw-ezio.com/hjbook_api'
/*
if(!DEVELOPMENT){
    Interface = 'http://lw-ezio.com/hjbook_api'
}
*/
// axios config that will be applied to every request
axios.defaults.baseURL = Interface // interface address
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
// stringify post array
axios.interceptors.request.use((config) => {
    if(config.method === 'post'){
        config.headers['Content-Type'] = config.headers.post['Content-Type'];
    }
    return config;
}, (error) => {
    console.log('parameter is illegal'); // need log function
    return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
    if(res.status === 204) {
        return res.data;
    }
    if(res.status !== 200 && res.status !== 201){
        return Promise.reject(res);
    } 
    return res.data;
}, (error) => {
    return Promise.reject(error);
})

// @params
// e.g. headers = headers.post['Confirmation-Token'] = 'vx5WRKAzCCvZJQvT4zRy'
export function fetch(url, params, method, headers, customConfigs = {}){
    if(method === 'get'){
        url = url + '?' + qs.stringify(params);
    }
    let user = util.storeWithExpiration.get('user');
    let auth_header = {};

    // add authentication
    console.dir(user)
    if(user && user.user_id){
        const client = util.getBrowserInfo();
        auth_header = {
            'Access-Token': user.token || '',
            'uid': user.user_id || '',
            'client': client || '',
        }
    }
    return new Promise((resolve, reject) => {
        let defaultHeader = JSON.parse(JSON.stringify(axios.defaults.headers));
        // if have custom headers, add them.
        if(headers){
            if(headers.post || headers.get || headers.put){
                Object.assign(defaultHeader, headers);
            }
            else {
                let header = {};
                header[method] = headers;
                Object.assign(defaultHeader, header);
            }
        }
        // add auth_header
        Object.assign(defaultHeader, auth_header)
        let config = {
            url: url,
            data: params || {},
            method: method || 'get',
            headers: defaultHeader,
            config: customConfigs,
        }
        axios(config).then((response) => {
            resolve(response);
        }).catch((error) => {
            let errorObj = {};
            if(error.response){
                // html error
                errorObj.data = error.response.data;
                errorObj.status = error.response.status;
            } else {
                // axios error
                errorObj.data = error.message;
            }
            reject(errorObj);
        });
    });
}

export default {
    Login(params){
        return fetch('/users/signin', params, 'post');
    },
    Signup(params){
        return fetch('/users', params, 'post');
    },
    getRecords(params) {

    },
    getBook(id) {
        return fetch(`/books/${id}`)
    },
    getBooks(params) {
        return fetch('/books', params)
    },
    getCategoryList(params) {
        return fetch('/categories', params)
    },
    getBooks_category(params, category) {
        return fetch(`/categories/${category}`, params)
    },
    getCurrentBorrowedByUser(userid) {
        return fetch(`/users/${userid}/books`);
    },
    borrowBook(bookid) {
        return fetch(`/books/${bookid}/borrow`, {}, 'post');
    },
    returnBook(bookid) {
        return fetch(`/books/${bookid}/return`, {}, 'post');
    }
}


