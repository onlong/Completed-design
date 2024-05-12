const fs = require("fs");
const path = require('path')

exports.upload = (req, res) => {
    let fileObj = null;
    let filePath = '';
 
    if(!req.files || Object.keys(req.files).length === 0) {
     res.status(400).send({
       code: 1,
       msg: 'Bad Request.'
     })
     return;
    }
 
    /* file 是上传时候body中的一个字段，有可以随意更改*/
    console.log(req.files, req.files.file)
    fileObj = req.files.file;
 
    filePath = './upload/' + fileObj.name;
    fileObj.mv(filePath, (err) => {
     if(err) {
       return res.status(500).send({
         code: 1,
         msg: 'System error'
       })
     }
 
     res.send({
       code: 0,
       data: 'Upload Successfuly'
     })
    })
 }

 exports.download = (req, res) => {
    console.log('object');
  const file = req.body
  // console.log(file.path);
  let exist = fs.existsSync(path.resolve(file.path))
  if(exist) {
    res.download(file.path)
  } else {
    res.send({
      code: 1,
      msg: 'File Not Exits'
    })
  }
}


 
