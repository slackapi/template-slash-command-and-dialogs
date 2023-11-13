const debug = require('debug')('slash-command-template:ticket');
const api = require('./api');
const payloads = require('./payloads');
const config = require('./dbConfig');

/*
 *  Send project creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = async (ticket) => {
  // open a DM channel for that user
  let channel = await api.callAPIMethod('conversations.open', {
    users: ticket.userId
  })

  let message = payloads.confirmation({
    channel_id: channel.channel.id,
    bu: ticket.bu,
    name: ticket.name,
    type: ticket.type
  });

  let result = await api.callAPIMethod('chat.postMessage', message)
  debug('sendConfirmation: %o', result);
};

// Create project. Call users.find to get the user's email address
// from their user ID
const create = async (userId, view) => {
  let values = view.state.values;

  // DEBUG
  console.log('VALUES OUTPUT');
  console.log('---- start commiting to heroku pg ----');
  console.log(JSON.stringify(values));
  console.log('---- end commiting to heroku pg ----');

  let result = await api.callAPIMethod('users.info', {
    user: userId
  });

  await sendConfirmation({
    userId,
    userEmail: result.user.profile.email,
    bu: values.bu_block.bu.selected_option && values.bu_block.bu.selected_option.text.text || 'not assigned',
    name: values.name_block.name.value || '_empty_',
    type: values.type_block.type.selected_option && values.type_block.type.selected_option.text.text || 'not assigned'
  });
};

module.exports = { create, sendConfirmation };
