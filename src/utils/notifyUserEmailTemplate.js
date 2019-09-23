
import capitalize from './capitalise';

const getMailUserBody = (userDetails, tripInfo) => {
  const {
    firstname, lastname
  } = userDetails;
  const { locations, departureDate, returnDate } = tripInfo;
  const FirstName = capitalize(firstname);
  const LastName = capitalize(lastname);

  const htmlTemplate = `<!DOCTYPE html>
  <html>
    <head>
      <title>BareFoot Nomad | Trip Confirmation</title>
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
            Your Trip to ${locations} scheduled for ${departureDate} till ${returnDate} was successfully created and it is awaiting Approval.
          </p>
          <p>
            Thank you for your patronage
          </p>
          <p>Yours Sincerely</p>
          <p style="font-weight:bold !important">Shadowcat BareFoot Nomad</p>
        </div>
      </div>
    </body>
  </html>
  `;
  return htmlTemplate;
};

export default getMailUserBody;
