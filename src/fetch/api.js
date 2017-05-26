import axios from 'axios'
import qs from 'qs'
import util from 'util'

let Interface = '/api/v1'

if(!DEVELOPMENT){
    Interface = 'http://bescene.staging.fooyo.sg/api/v1'
}
// axios config that will be applied to every request
axios.defaults.baseURL = Interface // interface address
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

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
        return true
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
    let organizer = util.storeWithExpiration.get('organizer');
    let customer = util.storeWithExpiration.get('customer');
    let auth_header = {};

    // add authentication
    if(organizer && organizer.id){
        const { access_token, id } = organizer;
        const client = util.getBrowserInfo();
        auth_header = {
            'access-token': access_token || '',
            'uid': id || '',
            'client': client || '',
        }
    } else if (customer && customer.id) {
        const { access_token, id } = customer;
        const client = util.getBrowserInfo();
        auth_header = {
            'access-token': access_token || '',
            'uid': id || '',
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
        return fetch('/organizers/signin', params, 'post');
    },
}


