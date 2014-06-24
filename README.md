android-test-push
=================

A small and simple node.js application to run locally. Use this to send notifications to single Android devices for your specific app.

- Install node.js (www.nodejs.org)
- Clone repo
- Change "YOUR_API_KEY" in the app.js file, to the server API key for sending push notifications to the app your testing
- Run 'npm install'
- Run 'node app.js'

- Send a HTTP GET request to localhost:3000/push/, adding following query params:
  - regId: your device registration id for the particular app your testing
  - Every other param will packaged into a JSON object, sent with the push to the receiving application, within the intent

E.g: http://localhost:3000/push/?regId=my-regId&foo=bar&do=true&say=what
... will add the "foo", "do" and "say" data to the intent.
