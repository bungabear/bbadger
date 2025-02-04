# maven-version-badger

Maven Artifact Version svg badge generator

## How to Use

1. Get artifact url (ex. com.google.code.gson.gson)

   ```
   https://repo1.maven.org/maven2/com/google/code/gson/gson/
   ```

2. Concatinate as `url` query

   ```
   https://bbadger.vercel.app/maven?url=https://repo1.maven.org/maven2/com/google/code/gson/gson/
   ```

3. Embed as Image

4. Check result  
   ![](https://bbadger.vercel.app/maven?url=https://repo1.maven.org/maven2/com/google/code/gson/gson/)

## Dependency

- express
- axios
- xml2js
- openBadge
