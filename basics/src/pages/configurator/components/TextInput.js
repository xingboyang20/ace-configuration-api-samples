import React from 'react';
import classnames from 'classnames';
import './TextInput.css';
import {
  getAssignedValue,
  formatAvailableValues
} from '../utils/variable-utils';
import Input from '../../../components/Input';

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
