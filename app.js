const express = require('express')
const app = express()
const port = 8000
const hexaendec = hex => parseInt(hex, 16);

app.post('/api/humidity', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const frame = JSON.parse(data);
    
    let val
    if(frame.data.slice(0,2) === '14'){
      val = hexaendec(frame.data.slice(2)) / 10;
    }else if(frame.data.slice(0,2) === '0a'){
      val = hexaendec(frame.data.slice(2,6)) / 10;
    }
    console.log('humidity :' +val);
    
  })
  
})
app.post('/api/temperature', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    const frame = JSON.parse(data);
   
    let val
    if(frame.data.slice(0,2) === '28'){
      val = hexaendec(frame.data.slice(2)) / 10;
    }else if(frame.data.slice(0,2) === '1e'){
      val = hexaendec(frame.data.slice(2,6)) / 10;
    }
    console.log('temperature :' + val);
    
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})