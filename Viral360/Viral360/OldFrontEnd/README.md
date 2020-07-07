# Viral360

## Initial setup
Get latest snapshot from Git. Ensure there are no local uncommitted modifications to files. Run `npm install`.
To run a local version simply run `npm start`
(Note this uses webpack.config.js and .env files for configuration)

## Build and Deploy

### Production

```
npm run build-prod
```
This runs webpack.prod.config.js which looks for .env.prod for the configurations and produces all the required front-end artifacts in the dist directory. 

- main application script: `bundle.js`
- asset files each named as a hexadecimal hash with PNG/JPG/etc extension

### Staging
```
npm run build-staging
```
This runs webpack.staging.config.js which looks for .env.staging for the configurations and produces all the required front-end artifacts in the dist directory. 


### Deploying the application 
The staging environment is deployed at https://uprise-staging-aaa.firebase.com/
To deploy the app to the staging environment, create a firebase deploy folder locally on the machine using `firebase login` and `firebase init` commands. (See documentation from Google here for reference : https://firebase.google.com/docs/hosting/quickstart. Also see CLI reference guide here - https://firebase.google.com/docs/cli)

Next, copy the contents of the dist/ folder from the build commands above into the 'public' folder within firebase deploy directory. 

Finally, run 
``` firebase deploy --only hosting ``` to push the build to staging

Follow the same steps for 

## Development and Linting

To run Webpack in development server mode:

```
npm run watch
```

Linting before commit:

```
npm run lint
npm run stylelint
```
