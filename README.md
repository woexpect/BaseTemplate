# Intro

This is a template project that uses a series of basic packages to start almost any React Native project, I assume you have already setup the React Native environment for Android and iOS in your local machine, the only thing you need to do is to clone this repo and start working on top of it.

# Content
This project contains a set of base libraries that allow new and experimented React Native users to have a quick-start project setup for almost any kind of application, here is a list of the libraries/features it contains:

- Basic setup of the following libraries.
- Set of well arranged folders to put the content into.
- Set of useful node scripts in the **package.json** folder.
   - **android:clean** -> Cleans the Android project.
   - **android-r** -> Creates a release mode build.
   - **pods** -> Installs the cocoa pods in the iOS project.
   - **start-r** -> Starts the metro bundler resetting the cache.
- **dot-env** for importing environment variables stored in a .env file (create a .env file in the root of the project and add the environment variables you need).
- **React Navigation** for in app screen registering and navigation. ([check documentation](https://reactnavigation.org/docs/getting-started)).
- **React Navigation Stack** library for basic app navigation. ([check documentation](https://reactnavigation.org/docs/stack-navigator)).
- **AnimatedSwitchStack** component for complex screen transitions, like when the users does login (example of usage in the **Router** component).
- **Redux Toolkit** for state management and sample slices with use cases. ([check documentation](https://redux-toolkit.js.org/introduction/getting-started)).
- **AsyncStorage** for storing simple data ([check documentation](https://github.com/react-native-async-storage/async-storage)).
- **date-fns** for easily handling dates in Javascript ([check documentation](https://date-fns.org/docs/Getting-Started)).
- **react-i18next** for locally handling locales.
- Set of plugins for better linting the code if shared with other people.
- An **api** folder containing a JS sample code with examples of https calls (**index.js**) and a **service.js** file that handles this calls and their state.
- **react-native-splash-screen** for handling splash screen in app.
- **react-native-size-matters** for better and easy handling of several screen ratios in different devices.
- **api** folder to store all the files related to external communication of the app.
- **assets** folder to store all the assets of the app.
- **common** folder to store all the shared resources of the app.
- **components** folder to store all new components of the app.
- **navigation** folder to store all the files related to the app's navigation.
- **redux** folder to store all the slices for handling the application's state management.
- **screens** folder to store all sets of screens in coherent groups.


# Downloading and running the project

## Step 1: Clone this repo into your machine

Use:

```bash
git clone https://github.com/woexpect/BaseTemplate.git
```

To download this repo into your local machine.

## Step 2: Install the projects dependencies

As any other React Native project, the first thing you have to do is install the project's dependencies, from your terminal run:

```bash
# Navigate to your project's folder
cd ~/path_to_your_project_folder
# Install the node modules
npm install
```

## Step 3: Install cocoa pods 

For the application to be able to run in iOS devices, please run the following command:

**While being in your project's folder (on terminal) For Android:**
```bash
# using npm
npm run pods
```

## Step 4: Run the application

To make sure everything is working as expected, before you start putting your code on top of this project run the application in both Android and iOS:

**While being in your project's folder (on terminal) For Android:**
```bash
# using npm
npm run android
```

**While being in your project's folder (on terminal) For iOS:**
```bash
# using npm
npm run ios
```

If everything is set up _correctly_, you should see the template app running in your _Android Emulator_ or _iOS Simulator.

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
