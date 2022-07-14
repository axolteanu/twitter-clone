# twitter-clone

This is a very basic Twitter clone. It only has a few of Twitter's basic features.
To test this project:

- Checkout repository on your machine.
- Run `npm ci` or `npm install`.
- Run `npx babel --watch views/react --out-dir public/js/react --presets react-app/prod` to compile React files.
- Run `node app.js`.
- Create *twitterclonedb* MySQL database. To do so, run *setupdb* script.
- Open browser and go to certificate settings. Add Certificate Authority file **myCA.pem** located in folder *security/cert*.
- Go to https://localhost:3000.