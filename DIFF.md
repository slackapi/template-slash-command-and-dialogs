#Updates from the previous version

Now all the Blueprints examples have updated using workspace token model from the previous user-centric model. So what are the diffs in this version?

## Creating the app

Instead of using the previous App creation page, the new app is creates one at [https://api.slack.com/apps?new_app_token=1](https://api.slack.com/apps?new_app_token=1).

## Scopes

Some scopes are no longer valid with the new workspace apps.

In previous version, the app required:
* `commands`
* `users:read`
* `users:read.email`
* `chat:write:bot`

In the new version:
* `commands`
* `users:read`
* `users:read.email`
* `chat:write`

You can learn more about scopes at [https://api.slack.com/scopes](https://api.slack.com/scopes)

## Installation

When you install the app, you will be ask to choose which channel(s) to install it. Once you install, on your Slack client, you see a message that tells you the app was adding to certain channel(s). Also the app name appears under "Apps". This is your `app_home`.

## OAuth

Your OAuth access token should begins with `-xoxa`, instead of `-xoxp`.

## Sigining secret

You used to verify if a request was coming from a reliable source (well, from us Slack!) by checking with the legacy *verificatin token*. Now you have more secure [sigining secret](https://api.slack.com/docs/verifying-requests-from-slack).

Basically, you need to compare the value of the `X-Slack-Signature`, the HMAC-SHA256 keyed hash of the raw request payload, with a hashed string containing your Slack signin secret code, combined with the version and `X-Slack-Request-Timestamp`. 
