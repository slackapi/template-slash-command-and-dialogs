const users = require('./users');
const axios = require('axios');

class Ticket {
  constructor(userId, text, responseUrl) {
    const promise = new Promise((resolve, reject) => {
      users.find(userId).then((result) => {
        resolve(result.data.user.profile.email);
      }).catch((err) => { reject(err); });
    });

    promise.then((result) => {
      this.userId = userId;
      this.userEmail = result;
      this.text = text;
      // Get this from the 3rd party helpdesk system
      this.ticketId = 123;
      this.send(responseUrl);

      return this;
    });
  }

  send(responseUrl) {
    axios.post(responseUrl, {
      text: 'Helpdesk ticket created!',
      attachments: [
        {
          title: `Ticket ${this.ticketId}: ${this.userEmail}`,
          // Get this from the 3rd party helpdesk system
          title_link: 'http://example.com',
          text: this.text,
          callback_id: 'ticket',
          fields: [
            {
              title: 'Status',
              value: 'Open',
              short: true,
            },
            {
              title: 'Priority',
              value: this.priority || 'Normal',
              short: true,
            },
          ],
          actions: [
            {
              name: 'priority',
              text: 'Set a priority',
              type: 'select',
              options: [
                { text: 'Low', value: 'Low' },
                { text: 'Normal', value: 'Normal' },
                { text: 'High', value: 'High' },
              ],
            },
          ],
        },
      ],

    });
  }

  setPriority(priority) {
    this.priority = priority;
  }
}

module.exports = Ticket;
