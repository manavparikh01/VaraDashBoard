import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './upload.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const history = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)
      history('/dashboard',
        {state: response.data }
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='Upload'>
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={fetchData}>Upload File</button>
    </div>
    </div>
  );
};

export default UploadPage;
