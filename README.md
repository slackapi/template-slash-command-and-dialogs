# Slash Command and Dialogs blueprint

> :sparkles: *Updated October 2018: As we have introduced some new features, this tutorial and the code samples have been updated! All the changes from the previous version of this example, read the DIFF.md*

## Creating a helpdesk ticket using a Slash Command and a Dialog

Use a slash command and a dialog to create a helpdesk ticket in a 3rd-party system. Once it has been created, send a message to the user with information about their ticket.

![helpdesk-dialog](https://user-images.githubusercontent.com/700173/30929774-5fe9f0e2-a374-11e7-958e-0d8c362f89a3.gif)

## Setup

#### Create a Slack app

1. Create an app at [https://api.slack.com/apps](https://api.slack.com/apps)
2. Add a Slash command (See *Add a Slash Command* section below)
3. Navigate to **Bot Users** and click "Add a Bot User" to create one.
4. Enable Interactive components (See *Enable Interactive Components* below)
5. Navigate to the **OAuth & Permissions** page and add the following scopes:
    * `commands`
    * `bot`
    * `users:read`
    * `users:read.email`
    * `chat:write:bot`
6. Click 'Save Changes' and install the app (You should get an OAuth access token after the installation)

#### Add a Slash Command
1. Go back to the app settings and click on Slash Commands.
1. Click the 'Create New Command' button and fill in the following:
    * Command: `/helpdesk`
    * Request URL: Your ngrok or Glitch URL + `/command`
    * Short description: `Create a helpdesk ticket`
    * Usage hint: `[the problem you're having]`

If you are using Glitch, the Request URL should look like: `https://my-slash-comm-app.glitch.me/command`.


#### Enable Interactive Components
1. Go back to the app settings and click on Interactive Components.
1. Set the Request URL to your server (*e.g.* `https://yourname.ngrok.com`) or Glitch URL + `/interactive`.
1. Save the change.

#### Run the app locally or [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/slack-slash-command-and-dialogs-blueprint)
1. Get the code
    * Either clone this repo and run `npm install`
    * Or visit https://glitch.com/edit/#!/remix/slack-slash-command-and-dialogs-blueprint
2. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_ACCESS_TOKEN`: Your bot token, `xoxb-` (available on the **OAuth & Permissions** once you install the app)
    * `SLACK_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
3. If you're running the app locally, run the app (`npm start`). Or if you're using Glitch, it automatically starts the app.
