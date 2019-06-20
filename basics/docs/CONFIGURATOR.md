# Configurator Sample

The configurator example shows how to create a small application that allows users to configure a product in a package on the CLM Platform.

The application we are building looks like this:

![Configurator sample](./configurator.gif)

This document describes how to build this basic configurator. It covers the following topics:

- [Server API review](#server-api-review)
- [Getting started](#getting-started)
- [UI from response](#ui-from-response)
- [Making assignments](#making-assignments)
  - [Dropdowns](#dropdowns)
  - [Text input](#text-input)
  - [Multivalued](#multivalued)
- [Dealing with issues](#dealing-with-issues)
- [Conflict resolution](#conflict-resolution)

### Server API review

We start with a quick review of the configure API. The API is stateless, that means that the client application is responsible for maintaining the current state of what the user has selected, and must provide that state in each request.

The API is designed for building interactive configurators, this means that:

- The API responds with a structure of `sections`, `variables` and `values`. This structure depends on the product we're configuring and a client application can use this structure to organize the the variables/values for the user.
- The names of the `sections`, `variables` and `values` are translations and you can request a translation different language (if provided in the VT Package)
- The value states in the response are simple and designed for a UI. A given value in the response can be `assigned: "byUser"`, `assigned: "bySystem"` or `incompatible`.

The API response can look like this:

```javascript
 "sections": [{
  "id": "General",
  "name": "General",
  "sections": [],
  "variables": [
    {
      "id": "TSHIRT_COLOR",
      "name": "Color",
      "valueType": "String",
      "distinctValueCount": 5,
      "allowMultipleAssignments": false,
      "values": [
        {
            "name": "Blue",
            "value": "BLUE",
            "properties": [],
            "assigned": "byUser",
            "incompatible": false
        },
       /* more values omitted for brevity */
      ],
    },
    /* more variables omitted for brevity */
```

_Refer to the CLM Platform documentation for more details._

## Getting started

We'll start by looking at the `<Configurator>` component defined in the `src/pages/configurator/index.js`. The first thing we need to do is to call the `/configure` API with the id of the product we want to configure.

The `<Configurator>` component defines a function called `configure` which we use to call the `/configure` API.

```javascript
import configureAPI from '../../api/configure';

configure = async assignments => {
  const { productId } = this.props.match.params;
  const packagePath = process.env.REACT_APP_PACKAGE_PATH;

  try {
    const result = await configureAPI({
      packagePath,
      date: new Date(),
      line: {
        productId,
        variableAssignments: assignments
      }
    });

    this.setState({ sections: result.sections });
  } catch (e) {
    // error handling left out for brevity
  }
};
```

The `configure` function calls the imported `api/configure` function which handles the HTTP call. The configure API gets called with:

- The **id** of the product to configure, which we get by looking in the URL
- The **path** of the package that has the product, which we get from the variable defined in the `.env` file.
- Any **assignments** passed into the function as arguments, see section about [making assignments](#making-assignments).

We call this function when the component is mounted.

```javascript
async componentDidMount() {
  this.configure();
}
```

This means that we are ready to render the UI when the component's state contains sections.

## UI from response

We want to use the sections from the API response to organize the UI. We do this by passing the sections down to child components. The UI is composed of the following components:

![Configurator components breakdown](configurator-components-breakdown.png)

We start by rendering the tabs like this:

```jsx
<Tabs
  tabs={sections.map(section => section.name)}
  onTabChange={this.handleActiveTabChange}
  activeTabIndex={activeTabIndex}
>
  <Section section={activeSection} />
</Tabs>
```

The `handleActiveTabChange` function is called by the `<Tab>` component when the active tab is changed. This function updates the `activeSection` that is passed to the `<Section>` component.

### `<Section>`

A `section` in the response have a list of variables and a list of potential (sub)sections. We use the `<Section>` component to render a `section`. We do this by rendering `<VariableLine>`s for each variable and `<Sections>`s for each subsection, like so:

```jsx
// Some variables may be hidden we don't want to render those.
const visibleVariables = section.variables.filter(showVariable);

if (visibleVariables.length === 0 && section.sections.length === 0) {
  return null;
}

return (
  <div>
    {level > 0 && (
      <header className={`section-header section-header-level${level}`}>
        {section.name}
      </header>
    )}
    {visibleVariables.map(variable => (
      <VariableLine
        key={variable.id}
        variable={variable}
        onAssign={onAssign}
        onUnassign={onUnassign}
        removedAssignments={removedAssignments}
      />
    ))}
    {(section.sections || []).map(subSection => (
      <Section
        key={`${section.id}-${subSection.id}`}
        section={subSection}
        onAssign={onAssign}
        onUnassign={onUnassign}
        removedAssignments={removedAssignments}
        level={level + 1}
      />
    ))}
  </div>
);
```

### `<VariableLine>`

The `<VariableLine>` component can render a line in the configurator and it takes a `variable` from the configuration response as an input.

A line in the configurator includes:

- The name of the variable.
- An asterisk which indicates if the variable is required.
- A list of potential issues related to the variable.
- An input control (for example a dropdown) for assigning values to the variable.
- A button to remove any assignments from the variable.

This is implemented like this:

```jsx
<div className={className}>
  <div className="variable-line-text">
    {variable.name} <RequiredMark variable={variable} />
    <Issues variable={variable} />
  </div>
  <div className="variable-line-input">
    <VariableInput
      removedAssignments={removedAssignments}
      variable={variable}
      onAssign={onAssign}
      onUnassign={onUnassign}
    />
  </div>
  <div className="variable-line-actions">
    {hasUserAssignedValue(variable) && (
      <UnassignButton variable={variable} onUnassign={onUnassign} />
    )}
  </div>
</div>
```

### `<VariableInput>`

The `<VariableInput>` render an input control that let the user assign values to a variable. It does this by rendering either a `<Dropdown>`, `<TextInput>` or `<MultivaluedInput>` component, like so:

```jsx
if (variable.allowMultipleAssignments) {
  return (
    <MultivaluedInput
      variable={variable}
      onAssign={onAssign}
      onUnassign={onUnassign}
    />
  );
}
if (variable.valueType === 'Number' && variable.distinctValueCount > 25) {
  return (
    <TextInput
      variable={variable}
      onAssign={onAssign}
      onUnassign={onUnassign}
      removedAssignments={removedAssignments}
    />
  );
}
if (variable.valueType === 'String' && !variable.distinctValueCount) {
  return (
    <TextInput
      variable={variable}
      onAssign={onAssign}
      onUnassign={onUnassign}
      removedAssignments={removedAssignments}
    />
  );
}
return (
  <Dropdown variable={variable} onAssign={onAssign} onUnassign={onUnassign} />
);
```

We have chosen to use the type of the variable and the number of distinct values to decide which component to render.

- For variables that allow multiple assignments, we render a `<MultivaluedInput>` component.
- For number variables with more than 25 distinct values, we render a `<TextInput>` allowing the user to type a value.
- For string variable with an unspecified number distinct values, we also render a `<TextInput>` because this means that the string value accepts any number of values.
- For everything else, we render a `<Dropdown>`.

These are just the choices of this basic configurator, another configurator may choose to different input controls (like radio buttons, images, etc.) based on other criteria (such as screen size, device type etc.).

We now have a basic understanding of how to call the `/configure` API and render a UI based on the structure in the response. Next, we will look at the input controls and how to make assignments.

## Making assignments

Before we start looking at the components that let users select values for the variables, we need to understand how to manage the state between the server and our client application.

### Managing state

The `/configure` API is stateless, this means that it doesn't remember any state between requests. Each time we call the server, it has forgotten all about any previous calls. Therefore it is up to the client to store and maintain a list of choices the user has made so far.

We store this list of choices (or assignments) as an array in our root component and define two functions for handling assignments and un-assignments.

```javascript
import { assign, unassign } from './utils/assignment-utils';

handleOnAssign = (variableId, value, exclude, multivalued) => {
  const newAssignments = assign(
    this.assignments,
    { variableId, value, exclude },
    multivalued
  );
  this.assignments = newAssignments;
  this.configure(newAssignments);
};

handleOnUnassign = (variableId, value, exclude) => {
  const newAssignments = unassign(this.assignments, {
    variableId,
    value,
    exclude
  });
  this.assignments = newAssignments;
  this.configure(newAssignments);
};
```

These two functions manipulate the `this.assignments` array using the helper function defined in `./utils/assignment-utils.js` and then call the server with the updated assignments.

We pass these two functions down to the components that that let users select values.

> Now is a good time to look at the two utility files called
>
> - `configurator/utils/assignment-utils.js` - defines helper functions for manipulating an array of assignments.
> - `configurator/utils/variable-utils.js` - defines helper functions for inspecting the state of variable/values.
>
> These two utility files are useful for almost any configurator application you may want to write. Feel free to copy those to your project and update them as necessary.

### `<Dropdown>`

The `<Dropdown>` component renders a dropdown of with possible values a user can choose for a variable. In our basic configurator we'll use the a [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) element as our dropdown, you may want to provide a better experience and use a component like [react-select](https://react-select.com/home) or similar, regardless the concepts are the same.

We want to:

- Render an option for each value.
- Render an empty option for unassigning if when possible.
- Select the currently assigned value.

```jsx
class Dropdown extends React.Component {
  handleOnChange = e => {
    const { variable, onAssign, onUnassign } = this.props;
    const { value } = e.target;

    value === NO_VALUE_VALUE
      ? onUnassign(variable.id)
      : onAssign(variable.id, value);
  };

  render() {
    const { variable } = this.props;
    const assignedValue = getAssignedValue(variable) || NO_VALUE;

    return (
      <select
        className="dropdown"
        value={assignedValue.value}
        onChange={this.handleOnChange}
      >
        {!hasSystemAssignedValue_(variable) && (
          <option key={NO_VALUE_VALUE} value={NO_VALUE_VALUE} />
        )}
        {variable.values.map((value, i) => (
          <Option key={`${value.value}-${i}`} value={value} />
        ))}
      </select>
    );
  }
}
```

In the `<Option>` component we wrap the "native" [`<option>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) and add a css class when the value is `incompatible`. This allows us to color incompatible options to indicate the value is incompatible with the current configuration. In the section about [conflict resolution](#conflict-resolution) we'll look at how to handle assignments of `incompatible` values.

```jsx
function Option({ value }) {
  const { name } = value;

  const className = classnames({
    'dropdown-incompatible': value.incompatible
  });

  return (
    <option className={className} value={value.value}>
      {name}
    </option>
  );
}
```

### `<TextInput>`

A <TextInput> is a text field that allows users to assign values to variables. Unlike the `<Dropdown>` this means that the user can enter invalid values and we need to deal with that.

> **Invalid vs Incompatible**
>
> Invalid isn't the same as Incompatible.
>
> - **Incompatible** means that you can get the value if you remove some other value(s)
> - **Invalid** means that you can never assign that value to the variable. For example, if you try to assign the value "red" to a number variable.

In the `<TextInput>` component we want to:

- Render an input field and make assignments when the value changes.
- Display the currently assigned value in the text field.
- Render a message if the user tried to assign an invalid value.

When we try to assign invalid values, the configure API respond with a list of removed assignments. These are assignments that have been removed from what was the requested. We can check if the variable behind the text input is in the list of removed assignments and display a message and add the `input-invalid` CSS class.

```jsx
class TextInput extends React.Component {
  handleOnChange = value => {
    const { variable, onAssign, onUnassign } = this.props;

    value === '' ? onUnassign(variable.id) : onAssign(variable.id, value);
  };

  render() {
    const { variable, removedAssignments } = this.props;
    const assignedValue = (getAssignedValue(variable) || { value: '' }).value;

    const removedAssignment = findRemoved(variable, removedAssignments);
    const message = removedAssignment
      ? getInvalidMessage(variable, removedAssignment)
      : null;
    const className = classnames('input', {
      'input-invalid': message
    });
    const displayValue = removedAssignment
      ? removedAssignment.value.value
      : assignedValue;

    return (
      <div className="text-input">
        <Input
          className={className}
          type={variable.type === 'Number' ? 'number' : undefined}
          value={displayValue}
          onChange={this.handleOnChange}
        />
        <div className="text-input-help">{message}</div>
      </div>
    );
  }
}
```

### `<MultivaluedInput>`

The `<MultivaluedInput>` component handles variables that accepts multiple assignments.

Before diving into the component, let's review how this is represented in the API. Below is a sample response for a variable that accepts multiple assignments. As we can see the values has an "include" (normal state) and "exclude" state.

- The "include" state is the state of selecting this value. For example, the **CARRIER** value's include state is assigned by the user and its exclude state is incompatible.
- The exclude state is the state of (actively) **not** selecting this value. For example, the **BOTTLE** value below is excluded by the user, this means that the user has chosen that he doesn't want a bottle.

```json
{
  "id": "BIKE_OPTIONS",
  "name": "BIKE_OPTIONS",
  "valueType": "String",
  "allowMultipleAssignments": true,
  "values": [
    {
      "value": "BOTTLE",
      "excluded": { "assigned": "byUser", "incompatible": false },
      "incompatible": false
    },
    {
      "value": "CARRIER",
      "excluded": { "incompatible": true },
      "assigned": "byUser",
      "incompatible": false
    },
    {
      "value": "LOCK",
      "excluded": { "incompatible": false },
      "incompatible": false
    }
  ]
}
```

When making assignments, we also need to specify if we are assigning to the include or exclude state.

The `<MultivalueInput>` renders two options for each value (so the user can "include" or "exclude" the value).

```jsx
class MultivaluedInput extends React.Component {
  render() {
    const { variable, onAssign, onUnassign, text } = this.props;

    const values = !variable.distinctValueCount
      ? [...variable.values.slice(1)]
      : variable.values;

    return (
      <div className="multivalued">
        {values.map(value => (
          <div className="multivalued-options" key={value.value}>
            <div className="multivalued-options-title">{variable.name}</div>

            <MultivaluedOption
              variable={variable}
              value={value}
              onAssign={onAssign}
              onUnassign={onUnassign}
              excluded={false}
              key="yes"
              text={text}
            />

            <MultivaluedOption
              variable={variable}
              value={value}
              onAssign={onAssign}
              onUnassign={onUnassign}
              excluded={true}
              key="no"
              text={text}
            />
          </div>
        ))}
      </div>
    );
  }
}
```

In the `<MultivaluedOption>` we:

- Renders a single radio button.
- Call `onAssign` or `onUnassign` with the right exclude option when the radio button is clicked.
- We add a `multivalued-option-incompatible` CSS class if the value is incompatible

```jsx
class MultivaluedOption extends React.Component {
  assigned(value, excluded) {
    return value && (excluded ? value.excluded.assigned : value.assigned);
  }

  incompatible(value, excluded) {
    return (
      value && (excluded ? value.excluded.incompatible : value.incompatible)
    );
  }

  handleOnChange = () => {
    const { onAssign, onUnassign, variable, value, excluded } = this.props;
    if (this.assigned(value, excluded) === 'byUser') {
      onUnassign(variable.id, value.value, excluded, true);
    } else {
      onAssign(variable.id, value.value, excluded, true);
    }
  };

  render() {
    const { value, excluded } = this.props;
    const className = classnames('multivalued-option', {
      'multivalued-option-incompatible': this.incompatible(value, excluded)
    });
    const checked = !!this.assigned(value, excluded);

    return (
      <label className={className}>
        <input
          type="radio"
          name={value.value}
          checked={checked}
          id={value.value + excluded}
          onChange={this.handleOnChange}
          value={value.value}
        />
        {excluded ? 'No' : 'Yes'}
      </label>
    );
  }
}
```
