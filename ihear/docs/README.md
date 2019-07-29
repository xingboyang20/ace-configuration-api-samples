# Customizing the iHear sample application

This sample application is designed especially for the iHear product. To
customize it for one of your own products, follow the steps below.

## Prerequisites

This sample assumes you are familiar with the basics of building a configurator
as shown in the [Configurator sample](../../docs/CONFIGURATOR.md).

## 1. Change hardcoded values

The application has some hardcoded values that are sent in all requests to
the `/configure` endpoint. They are hardcoded because they include data that
doesn't make sense for the end user to enter in the configurator.

You can find the hardcoded values in `src/api/index.ts`:

```typescript
const baseRequest: RequestType = {
  currency: 'EUR',
  language: 'uk_en',
  date: new Date(),
  viewId: 'DEFAULT',
  line: {
    id: 'ROOT',
    quantity: { value: 1, unit: 'EA' },
    productId: 'IHEAR'
  }
};

const baseAssignments = [
  { variableId: 'MRKT', value: 'GBR' },
  {
    variableId: 'DIM_BUILDDATE',
    value: '2018-10-17T10:00:00.000Z'
  }
];
```

The `baseRequest` contains hardcoded request values, such as the id of the product to use.

:pencil2: Change the `baseRequest.line.productId` to match the id of the product you want to use.

The `baseAssignments` contain assignments used in each request.

:pencil2: Change the `baseAssignments` assignments to makes sense for your product.

Additionally, the application assumes that:

- The first section in the view has an id called `Scope`.
- There is a variable with id `BMOD` (brochure model) in the `Scope` section. The values from the `BMOD` variable are used to render the 4 different choices **iHear Child**, **iHear Invisible**, **iHear Max**, and **iHear Power**.

:pencil2: Change the id of the variable used for brochure models. Edit the `BROCHURE_MODEL_VARIABLE_ID` in the `src/api/index.ts` file:

```typescript
const BROCHURE_MODEL_VARIABLE_ID = 'BMOD';
```

## 2. Change texts and images

### Home page

The images representing the brochure models (iHear Child, iHear Invisible, iHear Max, iHear Power) on the home page must match the values from the brochure model variable. The images are located in the `public` folder.

```
├── public
    ├── BM_CHILD.jpg
    ├── BM_INVISIBLE.jpg
    ├── BM_MAX.jpg
    └── BM_POWER.jpg
```

:pencil2: Add image files to the `public` folder to match the values of your brochure model variable.

Each image also has a description that shows when the mouse hovers over the image. These descriptions are located in `src/home/index.tsx`.

```javascript
const BM_SUB_TITLES = {
  BM_CHILD: 'From infancy to adolescence.',
  BM_INVISIBLE: 'Out of your way. On with your life.',
  BM_MAX: 'Maximum confidence. Minimum profile.',
  BM_POWER: 'Dynamically adjusts to any situation.'
};
```

This maps the brochure model values to a description.

:pencil2: Change this map to match your brochure model values with the descriptions you want to use.

The application contains other hardcoded texts like 'iHear Personalized hearing aids' in the top nav bar and the 'iHear - revolutionary long battery life' in the banner on home page.

:pencil2: Change application texts in the `src/components/AppBar.tsx` and `src/app.tsx` files.

:pencil2: (Optional) Change the banner image by replacing the `public/featured.jpg` file.

### Product page

The product page is where the user starts configuring the product. The application displays a description for each variable, and the mapping between the variable and its description is in the `src/products/lib/descriptions.js` file.

```javascript
const descriptions = {
  HEARING_LOSS:
    'Your level of hearing loss is used to determine the best type of hearing aid for you.',
  AGE:
    'Your age group is used to control which features are available for your iHear device.',
  GENDER: 'You gender is used to select default values for some features.',
  COLOR:
    'Personalize your iHear by choosing one of the following colors for your hearing aid.',
  ...
}
```

:pencil2: Change `src/products/lib/descriptions.js` to add descriptions for your variables.

## 3. Align section structure

The iHear product has a section structure like this:

```
[
  {
    id: "Scope", ...
  },
  {
    id: "User" , sections: [{
      id: "User", variables: [...]
    },
    id: "Style", sections: [{
      id: "Style", variables: [...]
    }]
  }

]
```

The variables for the wizard sections (such as `User` and `Style`) are nested 2
levels deep. This structure is used by the application code. If your product has
a different section structure, you can change the sections returned from the
`getConfiguration` function `src/api/index.ts`:

```javascript
const sections = resp.sections
  .filter(s => s.id !== 'Scope' && s.id !== 'General')
  .map(s => s.sections[0]);

return {
  brochureModel: getAssignedValue(getBrochureModelVariable(resp)),
  sections,
  removedAssignments: resp.removedAssignments.variableAssignments
};
```

The sections returned by `getConfiguration` are used to render the sections in the wizard. They must have a flat structure like this:

```javascript
[
  {
    id: 'User',
    variables: [...]
  },
  {
    id: 'Style',
    variables: [...]
  }
]
```

:pencil2: Ensure that the sections returned from `getConfiguration` is flat and match those in your product.
