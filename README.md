# CLM Configuration Samples

This repository contains sample applications that show how to use the CLM Platform Configuration API.

There are two samples:

- **[Basic](basics/README.md)** - A basic application that demonstrates each of the Configuration API endpoints.

- **[iHear](ihear/README.md)** - A larger application that mimics a webshop selling hearing aids.

## Prerequisites

In order to run the examples, you need to:

- Have [Node.js](https://nodejs.org/en/) installed.
- Have an installation of **CLM Platform** running.
- Have the iHear sample package published to the storage. Refer to the CLM Platform documentation for instructions on how to do that.

To follow along with the samples, you need to be familiar with:

- Building web apps with [React](https://reactjs.org/).
- The basic concepts in the CLM Platform, such as `sections`, `variables`, `values`, `assignments` etc. refer to the CLM Platform documentation.

For the `iHear` sample you also need a minimal understanding of [TypeScript](https://www.typescriptlang.org/).

## Authenticated APIs 
The samples in this repo assume that the CLM Platform APIs don't have authentication enabled. The CLM Platform APIs support the following authentication schemes:

* JWT bearer token
* API Key
* HTTP basic authentication

You can read more about these on in the CLM Platform documentation. 

To use the sample code with an authenticated API, you need to modify the `/basics/src/api/fetch.js` and `ihear/src/api/fetch.ts` files to send the right authentication information to the API. What you need to send depends on which scheme is enabled on the API. For example, to send an API Key in the basic example add the key to the HTTP headers like so:

 ```javascript
export default (url, method, payload) => {
  const headers = new Headers();
  // Adds API key to HTTP headers
  headers.append('Authorization', 'ApiKey DAxYmZiNDY1....' );
  //  Rest of function left out for brevity
```

The CLM Platform documentation details which HTTP headers that is required for other authentication schemes.
