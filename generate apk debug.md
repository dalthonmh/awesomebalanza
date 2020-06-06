# Generate apk debug

Apk debug is not ready to production but is debbugin mode in development enviroment.

## Versions

> react-native-cli: 2.0.1 \
> react-native: 0.62.2

## Procedure

**Step 1:** Create the folder _assets_
`mkdir android/app/src/main/assets`

**Step 2:** Run the following in the project directory

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle /index.android.bundle --assets-dest android/app/src/main/res
```

**Step 3:** Go to android directory
`cd android/`

**Step 4:** In android path run this command
`gradlew assembleDebug`

> Resumen de paso 3 y 4:

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle /index.android.bundle --assets-dest android/app/src/main/res && cd android && gradlew assembleDebug && cd ..
```

**Step 5:** Go to this folder and check the apk file

```
your_project-> android-> app-> build-> outputs-> apk-> debug-> app-debug.apk
```

¡That is!

---

> **Source:** [How to generate debug apk file from react-native](https://medium.com/codingtown/how-to-generate-apk-file-from-react-native-f4fbc923bfdb) \
> **autor:** [Ragu Developer](https://medium.com/@raguct25)
