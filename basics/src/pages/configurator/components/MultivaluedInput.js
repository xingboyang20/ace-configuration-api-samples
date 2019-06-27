import React from 'react';
import classnames from 'classnames';
import './MultivaluedInput.css';

/**
 * A single radio button in a `<MultivaluedOptions>` component.
 *
 *
 */
class MultivaluedOption extends React.Component {
  assigned(value, exclude) {
    return value && (exclude ? value.excluded.assigned : value.assigned);
  }

  incompatible(value, exclude) {
    return (
      value && (exclude ? value.excluded.incompatible : value.incompatible)
    );
  }

  handleOnChange = () => {
    const { onAssign, onUnassign, variable, value, exclude } = this.props;
    if (this.assigned(value, exclude) === 'byUser') {
      onUnassign(variable, { value: value.value, exclude });
    } else {
      onAssign(variable, { value: value.value, exclude });
    }
  };

  render() {
    const { value, exclude } = this.props;
    const className = classnames('multivalued-option', {
      'multivalued-option-incompatible': this.incompatible(value, exclude)
    });
    const checked = !!this.assigned(value, exclude);

    return (
      <label className={className}>
        <input
          type="radio"
          name={value.value}
          checked={checked}
          id={value.value + exclude}
          onClick={this.handleOnChange}
          onChange={() => {}}
          value={value.value}
        />
        {exclude ? 'No' : 'Yes'}
      </label>
    );
  }
}

/**
 * `<MultivalueInput>` component is used to render multiple assignable values
 * for variables that accepts multiple assignments.
 *
 * Each a value can be "included/excluded" and each option is being renders as
 * a radiobutton.
 */
class MultivaluedInput extends React.Component {
  render() {
    const { variable, onAssign, onUnassign } = this.props;

    const values = !variable.distinctValueCount
      ? [...variable.values.slice(1)]
      : variable.values;

    return (
      <div className="multivalued">
        {values.map(value => (
          <div className="multivalued-options" key={value.value}>
            <div className="multivalued-options-title">{value.name}</div>

            <MultivaluedOption
              variable={variable}
              value={value}
              onAssign={onAssign}
              onUnassign={onUnassign}
              exclude={false}
              key="yes"
            />

            <MultivaluedOption
              variable={variable}
              value={value}
              onAssign={onAssign}
              onUnassign={onUnassign}
              exclude={true}
              key="no"
            />
          </div>
        ))}
      </div>
    );
  }
}

export default MultivaluedInput;
