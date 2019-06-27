import React from 'react';
import classnames from 'classnames';
import './TextInput.css';
import {
  getAssignedValue,
  formatAvailableValues
} from '../utils/variable-utils';

/**
 * Wrapper around `<input>`. Calls `onChange` prop
 * when the input field loose or when the `Enter` key is pressed
 */
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

function findRemoved(variable, removedAssignments) {
  return removedAssignments.variableAssignments.find(
    ra => ra.variable.id === variable.id
  );
}

/**
 * Collect and format a message for invalid assignments
 */
function getInvalidMessage(variable, removedAssignment) {
  const displayValues = formatAvailableValues(variable);

  return `${
    removedAssignment.value.value
  } is not valid. Available values are [${displayValues}]`;
}

/**
 * `<TextInput>` component that knows about the data from the
 *  `/configure` API.
 */
class TextInput extends React.Component {
  handleOnChange = value => {
    const { variable, onAssign, onUnassign } = this.props;

    value === '' ? onUnassign(variable) : onAssign(variable, { value });
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
          type={variable.valueType === 'Number' ? 'number' : undefined}
          value={displayValue}
          onChange={this.handleOnChange}
        />
        <div className="text-input-help">{message}</div>
      </div>
    );
  }
}

export default TextInput;
