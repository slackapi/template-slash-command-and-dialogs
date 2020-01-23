# Slash Command and ~~Dialogs~~ Modals blueprint

> :sparkles: *Updated October 2019: As we have introduced some new features, this tutorial and the code samples have been updated! All the changes from the previous version of this example, read the [DIFF.md](DIFF.md)*

## Creating a helpdesk ticket using a Slash Command and a ~~Dialog~~ Modal

Use a slash command and a dialog to create a helpdesk ticket in a 3rd-party system. Once it has been created, send a message to the user with information about their ticket.

![helpdesk-dialog](https://user-images.githubusercontent.com/700173/30929774-5fe9f0e2-a374-11e7-958e-0d8c362f89a3.gif)

## Setup

### Create a Slack app

1. Create an app at [https://api.slack.com/apps](https://api.slack.com/apps)
2. Add a Slash command (See *Add a Slash Command* section below)
3. Enable Interactive components (See *Enable Interactive Components* below)
4. Navigate to the **OAuth & Permissions** page and select the following bot token scopes:
    * `commands`
    * `chat:write`
    * `users:read`
    * `users:read.email`
    * `im:write`
5. Click 'Save Changes' and install the app (You should get an OAuth access token after the installation)

#### Add a Slash Command
1. Go back to the app settings and click on Slash Commands.
1. Click the 'Create New Command' button and fill in the following:
    * Command: `/helpdesk`
    * Request URL: Your server or Glitch URL + `/command`
    * Short description: `Create a helpdesk ticket`
    * Usage hint: `[the problem you're having]`

If you did "Remix" on Glitch, it auto-generate a new URL with two random words, so your Request URL should be like: `https://fancy-feast.glitch.me/command`. 


#### Enable Interactive Components
1. Go back to the app settings and click on Interactive Components.
1. Set the Request URL to your server or Glitch URL + `/interactive`.
1. Save the change.


### Set Your Credentials

1. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_ACCESS_TOKEN`: Your bot token, `xoxb-` (available on the **OAuth & Permissions** once you install the app)
    * `SLACK_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
2. If you're running the app locally, run the app (`npm start`). Or if you're using Glitch, it automatically starts the app.

#### Run the app 

1. Get the code
    * Clone this repo and run `npm install`
2. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_ACCESS_TOKEN`: Your bot token, `xoxb-` (available on the **OAuth & Permissions** once you install the app)
    * `SLACK_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
3. If you're running the app locally, run the app (`npm start`).

If you want to run it locally, I recommend creating a localhost tunnel with [ngrok](https://ngrok.com)!


### App Flow Diagram
![diagram](https://api.slack.com/dev-cdn/v1568133600/img/api/articles/blueprints/slash_command_and_dialogs.png)
