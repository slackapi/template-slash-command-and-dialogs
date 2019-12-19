const debug = require('debug')('slash-command-template:ticket');
const api = require('./api');
const payloads = require('./payloads');

/*
 *  Send ticket creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = async (ticket) => {
  // open a DM channel for that user
  let channel = await api.callAPIMethod('im.open', {
    user: ticket.userId
  })

  let message = payloads.confirmation({
    channel_id: channel.channel.id,
    title: ticket.title,
    description: ticket.description,
    urgency: ticket.urgency
  });

  let result = await api.callAPIMethod('chat.postMessage', message)
  debug('sendConfirmation: %o', result);
};

// Create helpdesk ticket. Call users.find to get the user's email address
// from their user ID
const create = async (userId, view) => {
  let values = view.state.values;

  let result = await api.callAPIMethod('users.info', {
    user: userId
  });

  await sendConfirmation({
    userId,
    userEmail: result.user.profile.email,
    title: values.title_block.title.value,
    description: values.description_block.description.value || '_empty_',
    urgency: values.urgency_block.urgency.selected_option && values.urgency_block.urgency.selected_option.text.text || 'not assigned'
  });
};

module.exports = { create, sendConfirmation };
