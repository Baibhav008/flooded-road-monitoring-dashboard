const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const accountSid = 'AC70c6509110e0597e1cc204719ff8ccb9';
const authToken = '4d21ed191eb31497473fe8222e3096eb';
const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
  const { phoneNumber, message } = req.body;
  client.messages.create({
    body: message,
    to: phoneNumber,
    from: '+14054982462'
  })
  .then((message) => {
    res.status(200).send('Message sent successfully');
  })
  .catch((error) => {
    res.status(500).send('Error sending message: ' + error.message);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
