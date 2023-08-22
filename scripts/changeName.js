const fsp = require('fs/promises');
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// User provided information
let APP_NAME;
let ACCEPTED_NAME;
let APP_DISPLAY_NAME;
let ACCEPTED_DISPLAY_NAME;
let PACKAGE_NAME;
let ACCEPTED_PACKAGE_NAME;
let FINAL_PROCEED;
// Constants
const ANDROID_DEBUG_JAVA_PATH = './android/app/src/debug/java/com/basetemplate/';
const ANDROID_MAIN_JAVA_PATH = './android/app/src/main/java/com/basetemplate/';
const ANDROID_RELEASE_JAVA_PATH = './android/app/src/release/java/com/basetemplate/';
const ANDROID_BUILD_GRADLE_PATH = './android/app/build.gradle';
const ANDROID_STRINGS_PATH = './android/app/src/main/res/values/strings.xml';
const IOS_PROJECT_PBXPROJ = './ios/BaseTemplate.xcodeproj';
const IOS_INFO_PLIST = './ios/BaseTemplate/Info.plist';
const IOS_LAUNCH_SCREEN_PLIST = './ios/BaseTemplate/LaunchScreen.storyboard';
const APP_JSON_PATH = './app.json';
const PACKAGE_LOCK_PATH = './package-lock.json';
const PACKAGE_PATH = './package.json';
const SETTINGS_GRADLE_PATH = './android/settings.gradle';

const ANDROID_BASE_DEBUG_JAVA_PATH = './android/app/src/debug/java/';
const ANDROID_BASE_MAIN_JAVA_PATH = './android/app/src/main/java/';
const ANDROID_BASE_RELEASE_JAVA_PATH = './android/app/src/release/java/';

const RN_FLIPPER_JAVA = 'ReactNativeFlipper.java';
const MAIN_ACTIVITY_JAVA = 'MainActivity.java';
const MAIN_APPLICATION_JAVA = 'MainApplication.java';

const DEFAULT_APP_NAME = 'BaseTemplate';
const DEFAULT_ANDROID_PACKAGE = /com.basetemplate/g;

const writeAndReplaceFileToNewRoute = (originalFilePath, destinationFilePath, contentToReplace, newContent) => {
  console.log(`[STARTING] writeAndReplaceFileToNewRoute`);
  console.log(`originalFilePath   [${originalFilePath}]`);
  console.log(`destinationFilePath[${destinationFilePath}]`);
  console.log(`contentToReplace   [${contentToReplace}]`);
  console.log(`newContent         [${newContent}]`);
  try {
    let fileString = fs.readFileSync(originalFilePath).toString();
    fileString = fileString.replace(contentToReplace, newContent);
    fs.writeFileSync(destinationFilePath, fileString);
    console.log(`[SUCCESS] writeAndReplaceFileToNewRoute`);
    console.log(`============================================================================`);
  } catch (error) {
    console.log(`[ERROR] writeAndReplaceFileToNewRoute. STATUS: [FAILED] ERROR: [${error}]`);
    console.log(`============================================================================`);
  }
};

const removePaths = async () => {
  console.log(`[STARTING] removePath`);
  try {
    await fsp.rm('./android/app/src/debug/java/com', { recursive: true });
    await fsp.rm('./android/app/src/main/java/com', { recursive: true });
    await fsp.rm('./android/app/src/release/java/com', { recursive: true });
    console.log(`[SUCCESS] removePath`);
    console.log(`============================================================================`);
  } catch (error) {
    console.log(`[ERROR] removePath. STATUS: [FAILED] ERROR: [${error}]`);
    console.log(`============================================================================`);
  }
};

const question1 = () => {
  return new Promise((resolve) => {
    readline.question('Please enter the name of the application (Should not contain any white spaces and to be a single word or camel case word with starting uppercase i.e \'Violet\' or \'VioletCar\'):\n', (answer) => {
      APP_NAME = answer;
      resolve();
    });
  });
};

const question2 = () => {
  return new Promise((resolve) => {
    readline.question(`The new app name is going to be: ${APP_NAME}, is that right? (y/n):\n`, (answer) => {
      const answerChar = answer.charAt(0);
      if (answerChar === 'y') {
        ACCEPTED_NAME = true;
      } else if (answerChar === 'n') {
        ACCEPTED_NAME = false;
      }
      resolve();
    });
  });
};

const question3 = () => {
  return new Promise((resolve) => {
    readline.question(`Please enter the display name of the application (This is the name shown in the home of the installed device i.e. 'Violet' or 'Violet Car'):\n`, (answer) => {
      if (answer) {
        APP_DISPLAY_NAME = answer;
      } else {
        APP_DISPLAY_NAME = `com.${APP_NAME.toLowerCase()}`;
      }
      resolve();
    });
  });
};

const question4 = () => {
  return new Promise((resolve) => {
    readline.question(`The new package name is going to be: ${APP_DISPLAY_NAME}, is that right? (y/n):\n`, (answer) => {
      const answerChar = answer.charAt(0);
      if (answerChar === 'y') {
        ACCEPTED_DISPLAY_NAME = true;
      } else if (answerChar === 'n') {
        ACCEPTED_DISPLAY_NAME = false;
      }
      resolve();
    });
  });
};

const question5 = () => {
  return new Promise((resolve) => {
    readline.question(`Please enter the path of the Android and iOS package/bundleid (i.e. co.com.your.package), if empty it will be com.${APP_NAME.toLowerCase()}:\n`, (answer) => {
      if (answer) {
        PACKAGE_NAME = answer;
      } else {
        PACKAGE_NAME = `com.${APP_NAME.toLowerCase()}`;
      }
      resolve();
    });
  });
};

const question6 = () => {
  return new Promise((resolve) => {
    readline.question(`The new package/bundleid path is going to be: ${PACKAGE_NAME}, is that right? (y/n):\n`, (answer) => {
      const answerChar = answer.charAt(0);
      if (answerChar === 'y') {
        ACCEPTED_PACKAGE_NAME = true;
      } else if (answerChar === 'n') {
        ACCEPTED_PACKAGE_NAME = false;
      }
      resolve();
    });
  });
};

const finalProceed = () => {
  return new Promise((resolve) => {
    readline.question(`[WARNING] Please review the data before proceeding, and make sure all fields are valid.\n\nProceed with this data? (y/n):\n`, (answer) => {
      const answerChar = answer.charAt(0);
      if (answerChar === 'y') {
        FINAL_PROCEED = true;
        console.log(`============================================================================`);
      } else if (answerChar === 'n') {
        FINAL_PROCEED = false;
      }
      resolve();
    });
  });
};

const firsQuestionSet = async () => {
  await question1();
  await question2();
  if (ACCEPTED_NAME) {
    await secondQuestionSet();
  } else {
    await firsQuestionSet();
  }
  await reviewAndProceed();
};

const secondQuestionSet = async () => {
  await question3();
  await question4();
  if (ACCEPTED_DISPLAY_NAME) {
    await thirdQuestionSet();
  } else {
    await secondQuestionSet();
  }
};

const thirdQuestionSet = async () => {
  await question5();
  await question6();
  if (ACCEPTED_PACKAGE_NAME) {
    return;
  } else {
    await thirdQuestionSet();
  }
};

const createDirectory = async (directoryPath) => {
  try {
    console.log('[STARTING] CREATION OF NEW DIRECTORY');
    console.log(`DIRECTORY PATH   [${directoryPath}]`);
    await fsp.mkdir(directoryPath, { recursive: true });
    console.log('[FINISHED] CREATION OF NEW DIRECTORY SUCCESSFUL');
    console.log(`============================================================================`);
  } catch(error) {
    console.log(`Directory creation FAILED [${error}] [FINISHED WITH ERROR]`);
    console.log(`============================================================================`);
  }
};

const createAndroidDirectories = async () => {
  await createDirectory(`${ANDROID_BASE_DEBUG_JAVA_PATH}${PACKAGE_NAME.replace(/\./g, '/')}`);
  await createDirectory(`${ANDROID_BASE_MAIN_JAVA_PATH}${PACKAGE_NAME.replace(/\./g, '/')}`);
  await createDirectory(`${ANDROID_BASE_RELEASE_JAVA_PATH}${PACKAGE_NAME.replace(/\./g, '/')}`);
}

const changePackageNames = async () => {
  await writeAndReplaceFileToNewRoute(
    `${ANDROID_BUILD_GRADLE_PATH}`,
    `${ANDROID_BUILD_GRADLE_PATH}`, 
    DEFAULT_ANDROID_PACKAGE,
    `${PACKAGE_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${IOS_PROJECT_PBXPROJ}`,
    `${IOS_PROJECT_PBXPROJ}`, 
    DEFAULT_ANDROID_PACKAGE,
    `${PACKAGE_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${ANDROID_DEBUG_JAVA_PATH}${RN_FLIPPER_JAVA}`,
    `${ANDROID_BASE_DEBUG_JAVA_PATH}${PACKAGE_NAME.replace(/\./g, '/')}/${RN_FLIPPER_JAVA}`, 
    DEFAULT_ANDROID_PACKAGE,
    `${PACKAGE_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${ANDROID_MAIN_JAVA_PATH}${MAIN_ACTIVITY_JAVA}`,
    `${ANDROID_BASE_MAIN_JAVA_PATH}${PACKAGE_NAME.replace(/\./g, '/')}/${MAIN_ACTIVITY_JAVA}`, 
    DEFAULT_ANDROID_PACKAGE,
    `${PACKAGE_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${ANDROID_MAIN_JAVA_PATH}${MAIN_APPLICATION_JAVA}`,
    `${ANDROID_BASE_MAIN_JAVA_PATH}${PACKAGE_NAME.replace(/\./g, '/')}/${MAIN_APPLICATION_JAVA}`, 
    DEFAULT_ANDROID_PACKAGE,
    `${PACKAGE_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${ANDROID_RELEASE_JAVA_PATH}${RN_FLIPPER_JAVA}`,
    `${ANDROID_BASE_RELEASE_JAVA_PATH}${PACKAGE_NAME.replace(/\./g, '/')}/${RN_FLIPPER_JAVA}`, 
    DEFAULT_ANDROID_PACKAGE,
    `${PACKAGE_NAME}`,
  );
}

const changeAppNames = async () => {
  await writeAndReplaceFileToNewRoute(
    `${APP_JSON_PATH}`,
    `${APP_JSON_PATH}`, 
    DEFAULT_APP_NAME,
    `${APP_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${PACKAGE_LOCK_PATH}`,
    `${PACKAGE_LOCK_PATH}`, 
    DEFAULT_APP_NAME,
    `${APP_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${PACKAGE_PATH}`,
    `${PACKAGE_PATH}`, 
    DEFAULT_APP_NAME,
    `${APP_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${SETTINGS_GRADLE_PATH}`,
    `${SETTINGS_GRADLE_PATH}`, 
    DEFAULT_APP_NAME,
    `${APP_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${ANDROID_BASE_MAIN_JAVA_PATH}${PACKAGE_NAME.replace(/\./g, '/')}/${MAIN_ACTIVITY_JAVA}`, 
    `${ANDROID_BASE_MAIN_JAVA_PATH}${PACKAGE_NAME.replace(/\./g, '/')}/${MAIN_ACTIVITY_JAVA}`, 
    DEFAULT_APP_NAME,
    `${APP_NAME}`,
  );
};

const changeAppDisplayNames = async () => {
  await writeAndReplaceFileToNewRoute(
    `${ANDROID_STRINGS_PATH}`,
    `${ANDROID_STRINGS_PATH}`, 
    DEFAULT_APP_NAME,
    `${APP_DISPLAY_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${IOS_INFO_PLIST}`,
    `${IOS_INFO_PLIST}`, 
    DEFAULT_APP_NAME,
    `${APP_DISPLAY_NAME}`,
  );
  await writeAndReplaceFileToNewRoute(
    `${IOS_LAUNCH_SCREEN_PLIST}`,
    `${IOS_LAUNCH_SCREEN_PLIST}`, 
    DEFAULT_APP_NAME,
    `${APP_DISPLAY_NAME}`,
  );
};

const deleteTrash = async () => {

};

const masterBuilder = async () => {
  console.log(`[STARTING] CHANGE OF APP PACKAGE NAME / BUNDLE ID  [${PACKAGE_NAME}]`);
  await createAndroidDirectories();
  await changePackageNames();
  console.log(`[STARTING] CHANGE OF APP NAME [${APP_NAME}]`);
  await changeAppNames();
  console.log(`[STARTING] CHANGE OF APP DISPLAY NAME [${APP_DISPLAY_NAME}]`);
  await changeAppDisplayNames();
  console.log(`[STARTING] REMOVE TRASH CONTENT LEFT`);
  await removePaths();
  return;
};

const reviewAndProceed = async () => {
  console.log(`============================================================================`);
  console.log('STARTING CONFIGURATION WITH THE FOLLOWING DATA');
  console.log('APP_NAME           [', APP_NAME, ']');
  console.log('APP_DISPLAY_NAME   [', APP_DISPLAY_NAME, ']');
  console.log('PACKAGE_NAME       [', PACKAGE_NAME, ']');
  console.log(`============================================================================`);
  await finalProceed();
  if (FINAL_PROCEED) {
    await masterBuilder();
  } else {
    await firsQuestionSet();
  }
};

const main = async () => {
  await firsQuestionSet();
  readline.close();
}

main();