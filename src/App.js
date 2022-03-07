import React,{useState,useEffect,useCallback} from "react";
import {useDropzone} from 'react-dropzone'
import './App.css';
import axios from "axios";


const  UserProfiles =() => {

  const [userProfiles,setUserProfiles] = useState([]);

  const fetchUserProfiles = () => {
    axios.get("https://back-everglades-21857.herokuapp.com/api/v1/user-profile").then(res => {
      console.log(res);
      const data = res.data;
      setUserProfiles(res.data);
    });
  };

  useEffect(() => {
    fetchUserProfiles();
  },[]);
  return userProfiles.map((userProfile,index) => {
    return (
        <div key={index}>
          {  userProfile.userProfileId ? ( <img src = {`https://back-everglades-21857.herokuapp.com/api/v1/user-profile/${userProfile.userProfileId}/image/download`} />) : null}
          
          <br/>
          <br/>
          
          <h1>{userProfile.username} </h1>
          <h2>{userProfile.username} </h2>
          <p>{userProfile.userProfileId}</p>
          <Dropzone {...userProfile}/>
          <br/>

        </div>
    )
  })
};

function Dropzone({userProfileId}) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const file = acceptedFiles[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file",file);

    axios.post(
     `https://back-everglades-21857.herokuapp.com/api/v1/user-profile/${userProfileId}/image/upload`,
    formData,
    {
      headers:{
        "Content-Type" :"multipart/form-data"
      }

    }).then(()=>{
      console.log("file upload successfully")
    }).catch(err => {
      console.log(err);
    })

  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          (
             <p>Drop the image  here ...</p>): (
          <p>Drag 'n' drop profile image here, or click to select files</p>)
          
      }
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <UserProfiles/>
    </div>
  );
}

export default App;
