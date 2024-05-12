import axios from "axios";
// 以之前的post请求举例
export const doDownloadResume=(data)=>{
    axios({
        method: 'post',//请求方式
        headers: {
            'talents_token': window.localStorage.getItem('talents_token'),
        },
        data:data,
        url: `http://127.0.0.1:3007/api/files/download`,//请求路径
        responseType: 'blob'
    }).then(res => {
        const blob = new Blob([res.data], {
        type: 'application/msword',
        });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');//我们用模拟q标签点击事件
        const fname = data.name ; //下载文件的名字
        link.href = objectUrl;
        link.setAttribute('download', fname);
        document.body.appendChild(link);
        /**
        * 在这期间，我们可以做自己界面的反应逻辑
        **/
        link.click();//点击
        document.body.removeChild(link); // 下载完成移除元素
        window.URL.revokeObjectURL(URL); // 释放掉blob对象
    })
}