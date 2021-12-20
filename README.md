# protrans

api app with node and express

# Server

### after CD into Server folder

## Project setup

```
npm install
```

## Prepare Environment File

```bash
cp .env.example .env
```

Use port and local mongoose 'MONGO_URI_LOCAL' or use Atlas MongoDB 'MONGO_URI', these are default values.

```
PORT=5000
MONGO_URI_LOCAL=
MONGO_URI=mongodb://localhost:27017/protrans
```

### Compiles and hot-reloads for development

```
npm start
```

# Client

### after CD into Client folder

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

# API Documentaion

### Visit the server's API documentation at localhost:5000/api-doc

### or at PORT if change
