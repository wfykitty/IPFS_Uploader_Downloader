import React, { Component, useState, useEffect } from "react";
import './App.css';
import {Button} from '@material-ui/core';

const IPFSClient = require("ipfs-api");
const ipfs = IPFSClient({
    host: "ipfs.infura.io",
    port: "5001",
    protocol: "https"
});
  // const ipfsClient = require('ipfs-http-client')
  // //Configs to use local host for upload
  // const ipfs = ipfsClient('http://localhost:5001/')
  
  function App() {
    const [buffer, setBuffer] = useState(null); 
    const [picHash, setPicHash] = useState(''); 

    var hash = "";

    const captureFile = (event) => {
      event.preventDefault()
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        setBuffer(Buffer(reader.result));
        console.log(buffer);
      }
    }

    const onSubmit = async (event) => {
      event.preventDefault()
      const ver = await ipfs.version()
      console.log("IPFS Version=", ver)
      
      
    ipfs.files.add(Buffer.from(buffer),(err,res)=>{
          res.forEach(output => {
            console.log(output)
            // hash=output.path;
            setPicHash(output.path);
          });
      })
     console.log('Ipfs result', hash, picHash);
     setPicHash(hash);
    } 


  return (
      <div className="App">
      <div className="pure-g">
      <div className="pure-u-1-1">
      <h1>Store your Image on IPFS network</h1>
      <div> 1. Choose the image to be uploaded to IPFS</div>
        <div> 2. Click submit botton to save it to IPFS and generate the hash </div>
        <div>3. The image can be displayed and download by click download button</div>

      <img src={`https://ipfs.io/ipfs/${picHash}`} alt=""/>
      <h2>Upload Image</h2>
      <form onSubmit={onSubmit} >
      <input type='file' onChange={captureFile} />
      <input type='submit' />
      
      {/* {condition && element}   */}
      { picHash && <p>File hash: {picHash}</p>}
        
        <a href={`https://ipfs.io/ipfs/${picHash}`}
        target="_blank"
        download>
          
        <div><Button variant="contained" color="secondary"> download from IPFS </Button> </div>

        </a>
        
          </form>
            </div>
              </div>
                </div>
            );
          }

export default App;
