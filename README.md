<h1 align="center">
  Angular Environment Variable Sample Project
</h1>
<p align="center">
  Demonstrates how to use gulp-ng-config to add environment variable that your angular app can access
</p>

## Installation

1. Clone the application locally
1. Run `npm install`
1. Run `bower install`
1. Create a **.env** file containing you environment variables
1. Create a **config.js** file that returns an object with your different environment and their variables
1. Run `gulp`

Your **config.js** could take this format.
```javascript
var envVars = {
  apiUrl: process.env.API_URL || "http://localhost:3000/api",
  apiToken: process.env.API_TOKEN,
  debug: process.env.DEBUG || true
};

\\ You would change the contents of the various envs as you would like
module.exports = {
  development: {
    ENV_VARS: envVars
  },
  staging: {
    ENV_VARS: envVars
  },
  production: {
    ENV_VARS: envVars
  }
};
```

## Results

A **config module** containing the contents of your environment's variables as constants will be created. It will look something like this.
```javascript
angular.module("ngEnvVars.config")
  .constant("ENV_VARS", {
    "apiUrl": "https://myawesomeapi.com",
    "apiToken": "myawesomeapitoken",
    "debug": "false"
  });
```
