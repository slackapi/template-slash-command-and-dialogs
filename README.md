# Slash Command and Dialogs blueprint

*Updated August 2018: As we have introduced the workspace app (currently in beta), this tutorial and the code samples have been updated using the new token model! All the changes from the previous version of this example, read the [DIFF.md](DIFF.md)*

*Learn more about the workspace app at the [Slack API doc](https://api.slack.com/workspace-apps-preview).*

## Creating a helpdesk ticket using a Slash Command and a Dialog

Use a slash command and a dialog to create a helpdesk ticket in a 3rd-party system. Once it has been created, send a message to the user with information about their ticket.

![helpdesk-dialog](https://user-images.githubusercontent.com/700173/30929774-5fe9f0e2-a374-11e7-958e-0d8c362f89a3.gif)

## Setup

#### Create a Slack app

1. Create a *workspace app* at [https://api.slack.com/apps?new_app_token=1](https://api.slack.com/apps?new_app_token=1)
2. Add a Slash command (See *Add a Slash Command* section below)
3. Enable Interactive components (See *Enable Interactive Components* below)
4. Navigate to the **OAuth & Permissions** page and add the following scopes:
    * `commands`
    * `users:read`
    * `users:read.email`
    * `chat:write`
5. Click 'Save Changes' and install the app (You should get an OAuth access token after the installation)

#### Add a Slash Command
1. Go back to the app settings and click on Slash Commands.
1. Click the 'Create New Command' button and fill in the following:
    * Command: `/helpdesk`
    * Request URL: Your ngrok or Glitch URL + /commands
    * Short description: `Create a helpdesk ticket`
    * Usage hint: `[the problem you're having]`
1. Save and reinstall the app

#### Enable Interactive Components
1. Go back to the app settings and click on Interactive Components.
1. Set the Request URL to your server (*e.g.* `https://yourname.ngrok.com`) or Glitch URL + `/interactive-component`

#### Run the app locally or [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/slack-slash-command-and-dialogs-blueprint)
1. Get the code
    * Either clone this repo and run `npm install`
    * Or visit https://glitch.com/edit/#!/remix/slack-slash-command-and-dialogs-blueprint
2. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_ACCESS_TOKEN`: Your app's `xoxa-` token (available on the ****OAuth & Permissions** once you install the app)
    * `SLACK_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
3. If you're running the app locally, run the app (`npm start`)
