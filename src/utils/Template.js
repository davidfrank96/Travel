
import token from './Token';
import capitalize from './capitalise';

const { createToken } = token;
const getMailBody = (userDetails, fullUrl) => {
  const {
    id, email, firstname, lastname
  } = userDetails;
  const FirstName = capitalize(firstname);
  const LastName = capitalize(lastname);
  const tokenUser = createToken({ id, email });
  const link = `${fullUrl}/${tokenUser}`;
  const htmlTemplate = `<!DOCTYPE html>
  <html>
    <head>
      <title>BareFoot Nomad | Reset Password</title>
      <link
        rel='stylesheet'
        href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
        integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
        crossorigin='anonymous'
      />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <style>
        .button-property {
          background-color: transparent;
          border: 1px solid black;
          padding: 10px;
          border-radius: 7px;
          text-decoration: none;
          color: black !important;
        }
        .button-property:hover{
          cursor: pointer;
          background-color: #000000;
          color: white !important;
          border: 1px solid #f4f4f4;
       }
      </style>
    </head>
    <body>
      <div class='d-flex justify-content-center'>
        <div class='m-3'>
          <h4>Dear ${FirstName} ${LastName}</h4>
          <p>
            You have been directed here to reset your password and this should be done within 1hour to avoid
            invalidity of the request
          </p>
          <p>
            To do so, Please Click here
          </pp>
          <div class='text-center'>
            <a href='${link}' class='btn btn-info button-property'>Reset Password</a>
          </div>
          <p>Or copy and Paste the Link Below In Your Browser</p>
          <p> ${link} </p>
        </div>
      </div>
    </body>
  </html>
  `;
  const TemplateArray = [];
  TemplateArray.push(htmlTemplate);
  TemplateArray.push(tokenUser);
  return TemplateArray;
};

export default getMailBody;
