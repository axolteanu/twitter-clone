- Try using reject(err) instead of throw(err). See what happens.
- Make sure all promise rejections can be catched.
- Try using 'util' module to promisify functions instead of manually writing functions that return a promise.
- Understand how errors are/should be handled. Make sure the application is not left in an unwanted state after an error occurs.
- Make sure that all requests are handled appropriately no matter how and in what order they are sent. (Create diagram to help you.)
  e.g. What if I send a POST /signup with a valid auth token -> Redirect to home.
- Add signin feature.
- Add validation to signup form.
- Learn how to organize .css and .js files.
- Log errors in a file.