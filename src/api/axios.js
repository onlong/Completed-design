// // 引入 封装的api 
import api from './index.js';
 
// // 下面是详细的写法
export const ApiLogin = (data) => api({
    url: '/api/login', // 请求地址
    method: 'post', // 请求方式
    data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const userRegister = (data) => api({
    url: '/api/reguser', // 请求地址
    method: 'post', // 请求方式
    data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getUserinfo = (data,tok) => api({
    url: '/my/anthoruserinfo', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})

export const admininfo = (data,tok) => api({
    url: '/employee/my/getuserinfo', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const updateadmininfo = (data,tok) => api({
    url: '/employee/my/updateUserInfo', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const updateadminpwd = (data,tok) => api({
    url: '/employee/my/updatePassword', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const adminall = (data,tok) => api({
    url: '/employee/my/seeall', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const addadmin = (data,tok) => api({
    url: '/employee/user/regUser', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})

export const addbook = (data,tok) => api({
    url: '/api/book/release', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const insertbook = (data,tok) => api({
    url: '/api/book/insert', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const modifyuser = (data,tok) => api({
    url: '/my/userinfo', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const modifyPwd = (data,tok) => api({
    url: '/my/updatepwd', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getclass = (data,tok) => api({
    url: '/api/class/see', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getReviewed = (data,tok) => api({
    url: '/api/book/seewriter', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getbookstate = (data,tok) => api({
    url: '/api/book/seestate', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getbookid = (data,tok) => api({
    url: '/api/book/seeid', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getallbook = (tok) => api({
    url: '/api/book/see', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const setinvite = (data,tok) => api({
    url: '/api/invite/release', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getinvite = (data,tok) => api({
    url: '/api/invite/seenew', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getinviteid = (data,tok) => api({
    url: '/api/invite/seeid', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const ininvite = (data,tok) => api({
    url: '/api/invite/insert', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const addwait = (data,tok) => api({
    url: '/api/wait/release', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getwait = (data,tok) => api({
    url: '/api/wait/see', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getwaitinviit = (data,tok) => api({
    url: '/api/wait/seeinviit', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const inwait = (data,tok) => api({
    url: '/api/wait/insert', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const adminLogin = (data) => api({
    url: '/employee/user/login', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data:data,// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const getuserall = (tok) => api({
    url: '/my/all', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})

export const getinviteall = (tok) => api({
    url: '/api/invite/see', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const releaseaudit = (data,tok) => api({
    url: '/api/audit/release', // 请求地址
    method: 'post',
    data:data, // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const seeaudit = (data,tok) => api({
    url: '/api/audit/see', // 请求地址
    method: 'post',
    data:data, // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const releaseproofread = (data,tok) => api({
    url: '/api/proofread/release', // 请求地址
    method: 'post',
    data:data, // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const seeproofread = (data,tok) => api({
    url: '/api/proofread/see', // 请求地址
    method: 'post',
    data:data, // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const seeproofreadall = (tok) => api({
    url: '/api/proofread/seeall', // 请求地址
    method: 'post', // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const releaseclass = (data,tok) => api({
    url: '/api/class/release', // 请求地址
    method: 'post',
    data:data, // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})
export const insertclass = (data,tok) => api({
    url: '/api/class/insert', // 请求地址
    method: 'post',
    data:data, // 请求方式
    headers:{
        'Authorization':tok,
        'Content-Type': 'application/x-www-form-urlencoded',
    },// (一般post请求，我们习惯使用 data属性来传参)
    // params: params //(一般get请求，我们习惯使用params属性来传参）
    // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
})

