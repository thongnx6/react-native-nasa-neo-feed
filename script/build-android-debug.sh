#!/bin/bash
# Do a fully clean build on working and generate debug APK on local development
# machine and CI.
# See https://stackoverflow.com/a/36961021/3869533

# Backup current dir
CUR_DIR=$PWD

# Detect script dir and go up one level to be at root project dir
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Go to root project dir to start the build
cd "$SCRIPT_DIR/.."

echo "----------------------------------------"
echo "Make sure that node_modules is ready"
echo "----------------------------------------"
yarn

echo "----------------------------------------"
echo "Clean old gradle build"
echo "----------------------------------------"
cd android/
./gradlew clean


echo "----------------------------------------"
echo "Bundle react-native offline package"
echo "----------------------------------------"

# Run this the first time to create some folder needed for yarn to bundle the
# react-native code. After this command, the APK will be created without
# offline bundle. I guess that react-native cli will start it with some params
# to make it connect to Metro server for development
./gradlew assembleDebug

yarn react-native bundle --dev true --platform android \
  --entry-file index.js \
  --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle \
  --assets-dest ./android/app/build/intermediates/res/merged/debug

echo "----------------------------------------"
echo "Create APK using gradle"
echo "----------------------------------------"
./gradlew assembleDebug

# Go back to the original folder
cd $CUR_DIR
