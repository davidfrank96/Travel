
const htmlTemplate = managerId => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Dummy Index</title>
  <script src="/socket.io/socket.io.js"></script>
  <style>
    body{
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-xs-12 col-md-4 col-lg-4 col-xl-4">
        <div class="well">
          <h3>New Trip Requests</h3>
          <div class="" id="request">
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    const appendTrip = (message) => {
      let div = document.getElementById("request");
      let p = document.createElement("p");
      p.appendChild(document.createTextNode(message));
      div.appendChild(p);
    }
    
    const socket = io();
    socket.on('${managerId}', (data) => {
      appendTrip(data);
     })
  </script>
</body>
</html>
  
`;

export default htmlTemplate;
