import React, { Fragment, useState } from 'react'
import axios from 'axios';
import Message from './Message';
import Proggress from './Proggress';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File To Upload');
    const [uploadFile, setUploadFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercent, setUploadPercent] = useState(0);


    const onChange = (e) =>{
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        //Look up formData ~ standard javascript
        const formData = new FormData();
        formData.append('file', file);
        try{
            const response = await axios.post('/upload', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data' 
                },
                onUploadProgress: ProgressEvent => {
                    setUploadPercent(parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)))
                }
            });
            const { fileName, filePath } = response.data;
            setUploadFile({ fileName, filePath });
            setMessage('File Uploaded');
        }catch(err){
            if(err.response.status == 500)
               setMessage('there was a problem with server');
            else
               setMessage(err.response.data.msg);

        }
    }

  return (
    <Fragment>
    <form onSubmit = {onSubmit}>
    {message ? <Message msg={message} /> : null}
      <div className="custom-file">
        <input type="file" className="custom-file-input" id="customFile" onChange = {onChange} />
        <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
      </div>
       <Proggress percentage = {uploadPercent} />
     
      <input type = "submit" value = 'upload' className = "btn btn-primary btn-block mt-4" />
      </form>
      { uploadFile ? <div className = 'row'>
        <div className = "col-md-6 m-auto">
            <h3 className = "text-center">{uploadFile.fileName}</h3>
            <img style = {{width: '100%'}} src = {uploadFile.filePath} />
        </div>
      
      </div> : null}
    </Fragment>
  )
}

export default FileUpload;
