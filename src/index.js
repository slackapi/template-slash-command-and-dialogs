require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Ticket = require('./ticket');

const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h2>The Interactive Slash Command app is running</h2> <p>Follow the' +
  ' instructions in the README to configure the Slack App and your environment variables.</p>');
});

/*
 * Endpoint to receive /helpdesk slash command from Slack.
 * Checks verification token and then creates a ticket.
 */
app.post('/commands', (req, res) => {
  const { token, text, user_id, response_url } = req.body;
  if (token === process.env.SLACK_VERIFICATION_TOKEN) {
    if (text !== '') {
      // Store current ticket in memory in leui of a 3rd party helpdesk or database
      app.lastTicket = new Ticket(user_id, text, response_url);
      res.send('');
    } else {
      res.send('Try the command again with a description of the problem e.g. `/helpdesk everything is broken`');
    }
  } else { res.sendStatus(500); }
});

/*
 * Endpoint to receive interactive message events from Slack.
 * Checks verification token and then update priority.
 */
app.post('/interactive-message', (req, res) => {
  const { token, actions, response_url } = JSON.parse(req.body.payload);

  // Retreive current ticket in memory in leui of a 3rd party helpdesk or database
  // Replace with code to fetch ticket from 3rd party helpdesk or database based on callback_id
  const ticket = app.lastTicket;

  if (token === process.env.SLACK_VERIFICATION_TOKEN) {
    res.send('');
    const action = actions[0];
    ticket.setPriority(action.selected_options[0].value);
    ticket.send(response_url);
  } else { res.sendStatus(500); }
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}!`);
});
