import React from 'react';
import classnames from 'classnames';
import './MultivaluedInput.css';

/**
 * A single radio button in a `<MultivaluedOptions>` component.
 *
 *
 */
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
    const className = classnames('multivalued__option', {
      'multivalued__option--incompatible': this.incompatible(value, excluded)
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

function MultivaluedOptions({ variable, value, onAssign, onUnassign, text }) {
  const { name } = value;

  return (
    <div className="multivalued__options">
      <div className="multivalued__options__title">{name}</div>

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
  );
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
    const { variable, onAssign, onUnassign, text } = this.props;

    const values = !variable.distinctValueCount
      ? [...variable.values.slice(1)]
      : variable.values;

    return (
      <div className="multivalued">
        {values.map((v, i) => (
          <MultivaluedOptions
            variable={variable}
            value={v}
            onAssign={onAssign}
            onUnassign={onUnassign}
            key={v.name + i}
            text={text}
          />
        ))}
      </div>
    );
  }
}

export default MultivaluedInput;
