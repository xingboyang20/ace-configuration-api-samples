import React from 'react';
import classnames from 'classnames';
import './TextInput.css';
import { getAssignedValue } from '../utils/variable-utils';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = { displayValue: props.value };
  }

  componentWillReceiveProps(props) {
    // eslint-disable-next-line eqeqeq
    if (this.state.displayValue != props.value) {
      this.setState({ displayValue: props.value });
    }
  }

  handleOnChange = e => {
    this.setState({ displayValue: e.target.value });
  };

  handleOnKeyDown = e => {
    const { onChange } = this.props;

    if (e.key === 'Enter') {
      onChange(this.state.displayValue);
    }
  };

  handleOnBlur = () => {
    const { onChange } = this.props;

    onChange(this.state.displayValue);
  };

  render() {
    const { value, ...inputProps } = this.props;
    const { displayValue } = this.state;

    return (
      <input
        {...inputProps}
        value={displayValue}
        onChange={this.handleOnChange}
        onKeyDown={this.handleOnKeyDown}
        onBlur={this.handleOnBlur}
      />
    );
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    const { variable, onAssign, onUnassign } = this.props;

    value === '' ? onUnassign(variable.id) : onAssign(variable.id, value);
  }

  render() {
    const { variable } = this.props;
    const assignedValue = (getAssignedValue(variable) || { value: '' }).value;

    const className = classnames('input', {
      'input-removed': variable.removedAssignment
    });

    let message = '';
    if (variable.removedAssignment) {
      let availableValues = variable.values
        .filter(v => !v.incompatible)
        .map(v => v.value);

      let displayValues = availableValues.slice(0, 10).join(', ');
      let value = variable.removedAssignment.value;

      if (availableValues.length > 10) {
        displayValues = displayValues.concat(', ...');
      }

      message = `${value} is not valid. Available values are [${displayValues}]`;
    }

    let displayValue = variable.removedAssignment
      ? variable.removedAssignment.value
      : assignedValue;

    return (
      <div className="text-input">
        <Input
          className={className}
          type={variable.type === 'Number' ? 'number' : undefined}
          value={displayValue}
          onChange={this.handleOnChange}
        />
        <div className="text-input--help">{message}</div>
      </div>
    );
  }
}

export default TextInput;
