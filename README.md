Minso nasa neo feeds
===

[![pipeline status](https://gitlab.com/thongnx/minso-nasa-neo-feed/badges/master/pipeline.svg)](https://gitlab.com/thongnx/minso-nasa-neo-feed/commits/master)
[![coverage](https://gitlab.com/thongnx/minso-nasa-neo-feed/badges/master/coverage.svg)](https://gitlab.com/thongnx/minso-nasa-neo-feed/commits/master)
This is a simple project using NASA NEO - Feed​ to display a list of Asteroid object and might also allow the user to favourite them.
Build with [react-native](http://facebook.github.io/react-native/)

### Demo

![Minso nasa neo feeds](https://drive.google.com/open?id=1dGzqtmxu1e7v_nmZCQrmEhLRJvnYZtA6)

### Mobile Application

Operating System | Download | Alt. Download
-----------------|----------|--------------
Android          |          | or [APK file]()
iOS              |          | -

### Setup

1. Clone the repo
2. `$ cd minso-nasa-neo-feed`
3. Run either `$ yarn` or `$ npm install`

### Development

#### Android 

1. Config local SDK to the project (may be automation trigger by Android Studio)
2. Run via Android Studio or `$ yarn dev:android`

#### iOS

1. Run via XCode or `$ yarn dev:ios`

### Test

The project currently contains test for actions, reducers and components within `__test__` folder or any files have name include regex `.spec.js`

- **Unit Test**: `$ yarn test`
- **Test Coverage**: `$ yarn test:coverage`

#### Current Test Coverage

- **master**:  ![coverage](https://gitlab.com/thongnx/minso-nasa-neo-feed/badges/master/coverage.svg)
- **dev** :  ![coverage](https://gitlab.com/thongnx/minso-nasa-neo-feed/badges/dev/coverage.svg)

### Scripts

- `$ yarn start`: Running Metro bundler and keep Metro while developing
- `$ yarn lint`: Run eslint
- `$ yarn lint:fix`: Automation fix wrong follow [eslint rules](https://eslint.org/docs/rules/)

### Contributing and License

Author: Minso, thongnx6@gmail.com.
