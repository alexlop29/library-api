## Getting Started

```
nvm install 21.1.0
nvm use 21.1.0
npm init --template typescript
npm install express --save
npm install --save-dev nodemon
npm install mongoose --save
npm install --save-dev ts-node
npm i --save-dev @types/express
npm install --save-dev --save-exact prettier
npm install --save-dev eslint
npm install --save @sentry/node @sentry/profiling-node
npm install --save-dev jest
npm install --save-dev @babel/preset-typescript
```

## Running the application

debug mode

```
npm run start-debug
```

need to install prettier, eslint, etc.

formatting

```
npm run format
```

## Database Design

```
Add Docker Compose with MongoDB; Atlas requires IP addresses.
```

### Configure Sentry

platform: expressjs (nodejs)
