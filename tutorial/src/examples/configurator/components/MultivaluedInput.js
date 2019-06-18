import React from 'react';
import classnames from 'classnames';
import './MultivaluedInput.css';

class MultivaluedOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  assigned(value, excluded) {
    return value && (excluded ? value.excluded.assigned : value.assigned);
  }

  incompatible(value, excluded) {
    return (
      value && (excluded ? value.excluded.incompatible : value.incompatible)
    );
  }

  handleOnChange() {
    const { onAssign, onUnassign, variable, value, excluded } = this.props;
    if (this.assigned(value, excluded) === 'byUser') {
      onUnassign(variable.id, value.value, excluded, true);
    } else {
      onAssign(variable.id, value.value, excluded, true);
    }
  }

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

const MultivaluedOptions = ({
  variable,
  value,
  onAssign,
  onUnassign,
  text
}) => {
  var { name } = value;

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
};

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
