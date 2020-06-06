## Generar el apk antes de lanzar al playstore

## Pasos

### 1.- Generar una firma para la aplicación

keytool -genkeypair -v -keystore C:\my-upload-key.keystore -alias my-key-alias2 -keyalg RSA -keysize 2048 -validity 10000
Tener en cuenta que si te pide las credenciales en ingles debes responder yes o si en español.

**Pide los siguientes datos:**

- **Contraseña de almacen de claves**: (se recomienda uno facil ya que se mostrará en una linea de codigo adelante y de paso lo tienes que recordar para algo que aun no c)
- **Nombres y apellidos**: Nombre y apellidos no necesariamente completos
- **Nombre de unidad de orgnización**: Yo le puse mi nick D4ITON
- **Nombre de su organización**: Igual D4ITON
- **Nombre de su ciudad y localidad**: Tacna
- **Nombre de su estado o provincia**: Tacna
- **Codigo de dos letras de su pais**: PE

### 2.- Configurar variables del graddle

1. Copiamos el arhivo generado en `android/app`
2. Editamos el archivo `android/gradle.properties` y le pegamos las siguientes lineas:

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

Reemplazamos los \*\*\* por la clave que pusimos anteriormente (la contraseña facil).

### 3.- Agregamos la firma de la aplicación en la configuración del graddle

Vamos a `android/app/build.gradle` y pegamos lo siguiente

```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

### 4. Para generar el (Android App Bundle) solicita el google play console:

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/ && rm -rf android/app/src/main/res/drawable-_ && rm -rf android/app/src/main/res/raw/_ && cd android && gradlew assembleRelease && cd ..

```

.aab (Android App Bundle)

> Si sale error de Error: Duplicate resources [Ver esta respuesta](https://stackoverflow.com/questions/47084810/react-native-android-duplicate-file-error-when-generating-apk/52750886#52750886)

Para ejecutarlo usamos:

`npx react-native run-android --variant=release`
Se debe probar que funcione correctamente, para instalarlo y ejecutarlo en el device android de prueba
esto instalará en el device como si ya estubiera subido a la tienda.

---

Fuente: [React native apk signed](https://reactnative.dev/docs/signed-apk-android)
