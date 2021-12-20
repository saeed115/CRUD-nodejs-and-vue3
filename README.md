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

Fill prot and local 'MONGO_URI_LOCAL' mongoose connection string or use atlas mongodb 'MONGO_URI', and you can change settings like video quality and chunks. This are default values

```
PORT=
MONGO_URI_LOCAL=
MONGO_URI=
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
