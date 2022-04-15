const headers={
    "Content-type":"application/json",
    'Accept': 'application/vnd.github.v3.raw',
    'Authorization': `token ${process.env.REACT_APP_TOKEN}`
  }
module.exports={headers}