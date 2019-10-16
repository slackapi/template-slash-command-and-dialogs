require('dotenv').config();

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const qs = require('querystring');
const ticket = require('./ticket');
const signature = require('./verifySignature');
const debug = require('debug')('slash-command-template:index');

const apiUrl = 'https://slack.com/api';

const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.get('/', (req, res) => {
  res.send('<h2>The Slash Command and Dialog app is running</h2> <p>Follow the' +
  ' instructions in the README to configure the Slack App and your environment variables.</p>');
});

/*
 * Endpoint to receive /helpdesk slash command from Slack.
 * Checks verification token and opens a dialog to capture more info.
 */
app.post('/command', (req, res) => {
  // extract the slash command text, and trigger ID from payload
  const { text, trigger_id } = req.body;

  // Verify the signing secret
  if (signature.isVerified(req)) {
    // create the dialog payload - includes the dialog structure, Slack API token,
    // and trigger ID
    const view = {
      token: process.env.SLACK_ACCESS_TOKEN,
      trigger_id,
      view: JSON.stringify({
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Submit a helpdesk ticket'
        },
        callback_id: 'submit-ticket',
        submit: {
          type: 'plain_text',
          text: 'Submit'
        },
        blocks: [
          {
            block_id: 'title_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Title'
            },
            element: {
              action_id: 'title',
              type: 'plain_text_input'
            },
            hint: {
              type: 'plain_text',
              text: '30 second summary of the problem'
            }
          },
          {
            block_id: 'description_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Description'
            },
            element: {
              action_id: 'description',
              type: 'plain_text_input',
              multiline: true
            },
            optional: true
          },
          {
            block_id: 'urgency_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Importance'
            },
            element: {
              action_id: 'urgency',
              type: 'static_select',
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "High"
                  },
                  value: "high"
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Medium"
                  },
                  value: "medium"
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Low"
                  },
                  value: "low"
                }
              ]
            },
            optional: true
          }
        ]
      })
    };

    console.log('open view')

    // open the dialog by calling dialogs.open method and sending the payload
    axios.post(`${apiUrl}/views.open`, qs.stringify(view))
      .then((result) => {
        debug('views.open: %o', result.data);
        res.send('');
      }).catch((err) => {
        debug('views.open call failed: %o', err);
        res.sendStatus(500);
      });
  } else {
    debug('Verification token mismatch');
    res.sendStatus(404);
  }
});

/*
 * Endpoint to receive the dialog submission. Checks the verification token
 * and creates a Helpdesk ticket
 */
app.post('/interactive', (req, res) => {
  const body = JSON.parse(req.body.payload);

  // check that the verification token matches expected value
  if (signature.isVerified(req)) {
    debug(`Form submission received: ${body.view}`);

    // immediately respond with a empty 200 response to let
    // Slack know the command was received
    res.send('');

    // create Helpdesk ticket
    ticket.create(body.user.id, body.view);
  } else {
    debug('Token mismatch');
    res.sendStatus(404);
  }
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
