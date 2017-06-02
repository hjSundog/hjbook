import store from 'store'

// get brower info 

function getBrowserInfo(){
    let agent = navigator.userAgent.toLowerCase();
    if(agent.indexOf('msie') > 0){
        return 'msie';
    }
    if(agent.indexOf('firefox') > 0){
        return 'firefox'
    }
    if(agent.indexOf('chrome') > 0){
        return 'chrome'
    }
    if(agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0){
        return 'safari'
    }
    if(agent.indexOf('opera') > 0){
        return 'opera'
    }

    return 'unknown-brower'
}

// set and get localStorage with expiration 

var storeWithExpiration = {
    set: function(key, val, exp){
        // unit of exp is ms
        store.set(key, {val: val, exp: exp, time: new Date().getTime()})
    },
    get: function(key){
        var info = store.get(key);
        if(!info) { return {} }
        if(new Date().getTime() - info.time > info.exp){
            return null;
        }
        return info.val
    }
}


export default {
    getBrowserInfo,
    storeWithExpiration,
}