// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const port = process.env.PORT || 8000;

let dayMap = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

let monthMap = 
{
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};


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
  
  let hours = date.getHours()<10 ? "0"+date.getHours() : String(date.getHours());
  let minutes = date.getMinutes()<10 ? "0"+date.getMinutes() : String(date.getMinutes()); 
  let seconds = date.getSeconds()<10 ? "0"+date.getSeconds() : String(date.getSeconds());
  let convertedDate = `${dayMap[date.getDay()]}, ${date.getDate()} ${monthMap[date.getMonth()]} ${date.getFullYear()} ${hours}:${minutes}:${seconds} GMT`;
  
  let result = {
    unix: date.getTime(),
    utc: convertedDate
  }

  res.send(result);
});

app.get('/api/:date',(req,res) => {


  if(!parseInt(req.params.date))
  {
    console.log("This shit is running");
    return res.send({error: "Invalid Date"});
  }

  else if(!(/[-]/.test(req.params.date)) && parseInt(req.params.date))
  {
    let date = new Date(parseInt(req.params.date));
    
    let hours = date.getHours()<10 ? "0"+date.getHours() : String(date.getHours());
    let minutes = date.getMinutes()<10 ? "0"+date.getMinutes() : String(date.getMinutes()); 
    let seconds = date.getSeconds()<10 ? "0"+date.getSeconds() : String(date.getSeconds());
    let convertedDate = `${dayMap[date.getDay()]}, ${date.getDate()} ${monthMap[date.getMonth()]} ${date.getFullYear()} ${hours}:${minutes}:${seconds} GMT`;

    return res.send({
      unix: date.getTime(),
      utc: convertedDate
    });
  }

  let date = new Date(Date.parse(req.params.date));
  let hours = date.getHours()<10 ? "0"+date.getHours() : String(date.getHours());
  let minutes = date.getMinutes()<10 ? "0"+date.getMinutes() : String(date.getMinutes()); 
  let seconds = date.getSeconds()<10 ? "0"+date.getSeconds() : String(date.getSeconds());

  console.log(hours, minutes, seconds);

  let convertedDate = `${dayMap[date.getDay()]}, ${date.getDate()} ${monthMap[date.getMonth()]} ${date.getFullYear()} ${hours}:${minutes}:${seconds} GMT`;

  let result = {
    unix: date.getTime(),
    utc: convertedDate
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
