// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const port = process.env.PORT || 8000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req,res) =>{
  let date = new Date();
  
  let result = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }

  res.send(result);
});

app.get('/api/:date',(req,res) => {

  //Handling data parameters with invalid format

  if(!Date.parse(req.params.date) && !Number(req.params.date))
  {
    return res.send({error: "Invalid Date"});
  }


  //Checking for conditions when date parameter is given in microseconds.

  else if(!(/[-]/.test(req.params.date)) && Number(req.params.date))
  {
    let date = new Date(Number(req.params.date));

    return res.send({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } 

  //For handling regular test cases when date parameter is in a valid date format.

  let date = new Date(req.params.date);

  let result = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }

  res.status(200).send(result);
});

// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
