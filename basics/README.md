# Basic examples

These very basic examples that illustrate how to build applications against CLM Platform

This includes:

- [Product Search](docs/PRODUCT_SEARCH.md)
- [Configurator](docs/CONFIGURATOR.md)

## Getting started

Before you run the applicatiom, change the settings in the `.env` file to match your local setup of the CLM Platform:

- Change the `REACT_APP_API_URL` to the URL of your running configurator service.

- Change the `REACT_APP_PACKAGE_PATH` to reference the package you want to use. The application can use any valid and published VT package.

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

## Making it your own

The intention of this a example is to show how to build a configurator and to act as a starting poin for our configurator. To learn more, start by reading the [documention](docs/CONFIGURATOR.md).

The project is organized in the following folders:

```
├── docs                    # documentation (Start here)
├── public                  # index.html and assets
└── src
    ├── api                 # helpers for calling the http API
    ├── components          # general components
    └── pages
        ├── product-search  # example using the /products API
        └── configurator    # example configurator using the /configure API
```

This project is created with [Create React App](https://facebook.github.io/create-react-app/) their documentation has a lot valuable information about topics like: _Adding styles and assets_, _Deployment_, _Editor Setup_ etc.
