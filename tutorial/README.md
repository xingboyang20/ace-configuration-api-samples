# Tutorials

Small example applications that illustrate how to build applications against CLM Platform

Examples include:

- [Product Search](docs/PRODUCT_SEARCH.md)
- [Configurator](docs/CONFIGURATOR.md)

## Getting started

Before you run the tutorial, change the settings in the `.env` file to match your local setup of the CLM Platform:

- Change the `REACT_APP_API_URL` to the URL of your running configurator service.

- Change the `REACT_APP_PACKAGE_PATH` to reference the package you want to use. The tutorial can use any valid and published VT package.

For example:

```
REACT_APP_API_URL=http://localhost:9010/configurator/v1
REACT_APP_PACKAGE_PATH=samples/ihear
```

Then install the code dependencies:

```
npm install
```

And start the application with

```
npm start
```
