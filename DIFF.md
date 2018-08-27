# What's New? - Updates from the Previous Example

Now all the Blueprints examples have been updated with new Slack platform features also switched to the [workspace token](https://api.slack.com/docs/working-with-workspace-tokens) model. So what are the *diffs* in this updated example?

## Creating an app

To create a new "workspace app" at [https://api.slack.com/apps?new_app_token=1](https://api.slack.com/apps?new_app_token=1), instead of using the previous App creation page.

## OAuth Scopes

Some scopes are no longer valid with workspace apps.

In previous example, these scopes were required:
* `commands`
* `users:read`
* `users:read.email`
* `chat:write:bot`

In the new version, you need to enable:
* `commands`
* `users:read`
* `users:read.email`
* `chat:write`

Notice that the `bot` scope is no longer supported because there is a no "bot user" for the new workspace apps.

You can learn more about scopes at [https://api.slack.com/scopes](https://api.slack.com/scopes)

## OAuth Token

Your OAuth access token should begins with `-xoxa`, instead of `-xoxp`.


## Installation and Permission

When a user is installing your app, the user will be ask to choose which channel(s) to install. After the installation, the app name appears under "Apps" at the menu pane on Slack client, and this is now called `app_home`, a where your app can send DM to the user who installed your app. 

Also, your slash command is only available on the channels that your app is installed, unless some user adds it on other channels.


## Sigining Secret 

*This requires to update your code!*

Previously, you needed to verify a *verificatin token* to see if a request was coming from Slack, not from some malicious place by simply comparing a string with the legacy token with a token received with a payload. But now you must use more secure *sigining secrets*.

Basically, you need to compare the value of the `X-Slack-Signature`, the HMAC-SHA256 keyed hash of the raw request payload, with a hashed string containing your Slack signin secret code, combined with the version and `X-Slack-Request-Timestamp`. 

Learn more at [Verifying requests from Slack](https://api.slack.com/docs/verifying-requests-from-slack).


## Short-lived tokens

Short-lived tokens are also introduced as a security feature, which allows the app owners to proactively rotate tokens when the tokens are compromised.

Your workspace app can use the new `apps.uninstall` method to uninstall itself from a single workspace, revoking all tokens associated with it. To revoke a workspace token without uninstalling the app, use `auth.revoke`.

The short-lived token is *not* included in this Blurprints example since this tutorial is written for internal integration, however, if you are distributing apps, you are required to use short-lived tokens.

:gift: If you are using the [Node SDK](https://github.com/slackapi/node-slack-sdk/issues/617), the token refresh feature is available for you already.

