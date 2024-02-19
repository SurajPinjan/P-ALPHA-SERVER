```
npm run dev
```

This will start the server at `http://localhost:3000` by default. You can change the port in the `src/index.ts` file or create an `.env` file to manage the environt-specific variables separately.

For production, you can build the TypeScript files and then start the server. Run the following commands:

```
npm run build
npm start
```

## Project Structure

The project structure is organized as follows:

- `src`: Contains TypeScript source files
  - `index.ts`: Configures and starts the Express application
- `dist`: Output directory created during build for compiled TypeScript files
- `package.json`: Project configuration and dependencies
- `tsconfig.json`: TypeScript configuration

You can customize the project configuration i nthe `tsconfig.json` file and adjust the server settings in the `src/index.ts` file.

<!-- knex commands -->

<!-- create migration-->

npx knex migrate:make init-migration --knexfile src\config\knexfile.ts

<!-- create seed -->

npx knex seed:make init-seed --knexfile src\config\knexfile.ts

<!-- run latest migration up -->

npx knex migrate:latest --knexfile src\config\knexfile.ts

<!-- rollback migration -->

npx knex migrate:rollback --knexfile src\config\knexfile.ts

<!-- run seed -->

npx knex seed:run --knexfile src\config\knexfile.ts

<!-- pm2 start process -->

pm2 start index.js --name 'alpha-server'

<!-- build exe for windows server -->

pkg . --target node16-win-x64 --output alpha-server.exe --entry [dist/index.js] --env-file .env

<!-- build exe -->

pkg . --target node16-win-x64 --output alpha-server.exe --entry [dist/index.js] --env-file .env

<!-- create service (needs admin)-->

sc.exe create "6SigmaServer" binPath= "C:\work\Titan_Projects\six_sigma_server\6sigma-server.exe" start= auto DisplayName= "6SigmaServer"
