import "./home.css";
import axios from "axios";
import { BackendDataType } from "../../types/types";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000"
});


const Home = () => {
  const [backendData, setBackendData] = useState<BackendDataType>();

  const getBackendData = async () => {
    const data = await api.get("/").then((response) => {
      return response.data;
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    console.log("Data: ", data);
    setBackendData(data);
    console.log("Backend data: ", backendData);
  }

  return (
    <div className="home">
      <h3 className="inner">Home page</h3> 
      <button className="inner" onClick={getBackendData}>Click to get data from the backend!</button>
        { backendData !== undefined && backendData.posts.map((post, idx) => (
          <div key={idx}>
            <h4>Title: {post.title}</h4>
            <p>Body: {post.body}</p>
            <p></p>
          </div>
        ))}
    </div>
  )
}

export default Home;