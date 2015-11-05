# Slides

Launch local `talk/index.html` or online [http://fayway.github.io/ComponentsTesting/](http://fayway.github.io/ComponentsTesting/)

# Demo

## Prerequisites

- Install Node 4

- Clone this repo

- Install dependencies

```
cd project-folder
```

```
npm install
```

## Code Before and After Refactoring

### MVC/Template Based Design

```
git checkout -b templates templates
```

### Components Based Design

```
git checkout master
```

## Internal server (with LiveReload)

```
npm run serve
```

Navigate to `http://localhost:8080/`


# Tests

Some tests need compiled RequireJS modules

```
npm run compile
```

Running CLI test

```
npm test
```

It executes tests listed in file

```
test/index.js
```

## Browser tests

Navigate to `http://localhost:8080/test`



