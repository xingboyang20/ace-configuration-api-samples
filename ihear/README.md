# iHear sample application

The iHear sample illustrates how to build a webshop-style configurator with the iHear model hosted on Ace Platform.

![iHear demo](./docs/ihear-demo.gif)

## Getting started

Before you run the application, change the settings in the `.env` file to match your local setup of Ace Platform.

- Change the `REACT_APP_API_URL` to the URL of your Ace Platform installation.
- Change the `REACT_APP_PACKAGE_PATH` to reference the package you want to use. The demo can use any valid and published package containing a configurable product called iHear.

For example:

```
REACT_APP_API_URL=http://localhost:9000/configurator/v1
REACT_APP_PACKAGE_PATH=samples/ihear
```

Then install the code dependencies:

```
npm install
```

And start the application with:

```
npm start
```

## Making it your own

This sample is made specifically for the iHear product. To change it to work
with one of your products, see [Customizing the iHear sample application](docs/README.md).
