# We to World Apps - Public Repository

Copyright (c) 2021 ECL Projects

This repository contains all the front-end scripts for [We To World Apps](https://apps.weto.world).

## Repository Purpose

We are aware that many web applications are loaded in your browser without provide a clear way to check its logic and/or if there is any intrusive script.\
ECL Projects provide this repository, which contains the front-end logic, styles and assets, to allow you to check what is being saved and executed in **your browser** at the moment you access to any of our services.

## Licensing

This project is licensed under the [MIT License](https://gitlab.com/eclprojects/w2w-apps-home/-/tree/master/LICENSE).

## Contributing

For now, we will be accepting merge request or/and issues reports for currently maintained features.\
Our roadmap is not available for the public, so if you want to contribute with a new feature,
feel free to open a new issue in this repository to request it.

## Project Arquitecture & Design

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) (not ejected yet).

*Important: This project does **NOT** use the default application structure. Check the [src folder](https://gitlab.com/eclprojects/w2w-apps-home/-/tree/master/src) for more details*

### Pre-requisites

- [NodeJS >= 12](https://nodejs.org/en/) installed with your package manager, Node installer (on Windows) or with [NVM](https://github.com/nvm-sh/nvm)
- [Yarn](https://yarnpkg.com/getting-started/install) (To install, execute: `npm i -g yarn`)
- DotEnv file (.env) set in the project root. See [.env.example](https://gitlab.com/eclprojects/w2w-apps-home/-/blob/master/.env.example) for more details.

### Recommended development tools (optional)

- An [ESLint](https://eslint.org/) plugin/extension
- A SASS Linter

### To start coding

To set up this project, just execute the following commands:

```bash
git clone https://gitlab/eclprojects/w2w-apps-home w2w-apps

cd w2w-apps
```

And then install the dependencies:

```bash
yarn
```

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The respective renders will reload if you make changes. If not, reload the browser tab/s manually.\
If is the case, you can also see the lint errors in the console.

#### `yarn run start:ssl`

Same than `yarn start`, this runs the app in the development mode but using a self-signed certificate to allow HTTPS.\
If you do not have a properly configured `.cert` directory in the root of this project, this script **will not work**.

To set-up a self-signed certificate, see the following intructions:

##### Workspace / System pre-requisites

- [Homebrew](https://brew.sh/) (no support for BSD systems :c)
- mkcert
- nss (for Firefox use)

##### Steps to configure

1. Install dependencies if they are not already installed:

    ```bash
    brew install mkcert

    brew install nss

    mkcert -install
    ```

    After running the above commands, you'll have created a [certificate authority](https://en.wikipedia.org/wiki/Certificate_authority) on your machine which enables you to generate certificates for all of your future projects

2. To create the `.cert` directory. In the **project root** execute:

    ```bash
    mkdir -p .cert
    ```

3. Now, generate the certificate:

    ```bash
    mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
    ```

Note: Instructions [source](https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/)

##### Finally

Now, the command should open [https://localhost:3000](https://localhost:3000) in your default browser.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
