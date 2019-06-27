# Basic sample application

This sample application demonstrates how to use the CLM Platform Configuration API.

It includes:

- [Product search](docs/PRODUCT_SEARCH.md)
- [Configurator](docs/CONFIGURATOR.md)

## Getting started

Before running the application for the first time, change the settings in the `.env` file to match your local setup of the CLM Platform:

- Change the `REACT_APP_API_URL` to the URL of your running configurator service.

- Change the `REACT_APP_PACKAGE_PATH` to reference the published VT package you want to use.

For example:

```
REACT_APP_API_URL=http://localhost:9010/configurator/v1
REACT_APP_PACKAGE_PATH=samples/ihear
```

Next, install the code dependencies:

```
npm install
```

Then start the application:

```
npm start
```

## Structure

The project has the following strucure:

```
├── docs                    # documentation (Start here)
├── public                  # index.html and assets
└── src
    ├── api                 # helpers for calling the HTTP API
    ├── components          # general React components
    └── pages
        ├── configurator    # example configurator using the /configure endpoint
        └── product-search  # example using the /products endpoint
        
```

This project is created with [Create React App](https://facebook.github.io/create-react-app/). The React documentation has a lot valuable information about topics like _Adding styles and assets_, _Deployment_, _Editor Setup_, and so on.

## Making it your own

The intention of this sample is to act as a starting point for building your own configurator. To learn more, start by reading the [configurator documention](docs/CONFIGURATOR.md).
