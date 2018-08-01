# Updates from the previous version

Now all the Blueprints examples have updated with new feature updates also switched to the [workspace token](https://api.slack.com/docs/working-with-workspace-tokens) model. So what are the *diffs* in this updated example?

## Creating an app

Instead of using the previous App creation page, create a new "workspace app" at [https://api.slack.com/apps?new_app_token=1](https://api.slack.com/apps?new_app_token=1).

## OAuth Scopes

Some scopes are no longer valid with workspace apps.

In previous version, this sample app required:
* `commands`
* `users:read`
* `users:read.email`
* `chat:write:bot`

In the new version:
* `commands`
* `users:read`
* `users:read.email`
* `chat:write`

Notice the scope for bots are no longer used because there is a no "bot user" for the new workspace apps.

You can learn more about scopes at [https://api.slack.com/scopes](https://api.slack.com/scopes)

## OAuth Token

Your OAuth access token should begins with `-xoxa`, instead of `-xoxp`.


## Installation Process

When a user install the app, the user will be ask to choose which channel(s) to install. After the installation, the app name appears under "Apps", and this is now called `app_home`, a where your app is able to DM with the user who installed your app. 

Your slash command is only available on the channels that your app is installed, unless some user add it on other channels.


## Sigining secret 

*This requires to update your code!*

Previously, you needed to verify if a request was coming from Slack by simply comparing a string with the legacy *verificatin token* with a token received from a payload. But now you use more secure [sigining secret](https://api.slack.com/docs/verifying-requests-from-slack).

Basically, you need to compare the value of the `X-Slack-Signature`, the HMAC-SHA256 keyed hash of the raw request payload, with a hashed string containing your Slack signin secret code, combined with the version and `X-Slack-Request-Timestamp`. 
