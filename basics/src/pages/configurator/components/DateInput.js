import React from 'react';
import classnames from 'classnames';
import './DateInput.css';
import {
  getAssignedValue,
  formatAvailableValues
} from '../utils/variable-utils';

const with2Digits = v => ('0' + v).slice(-2);

/**
 * Helper to format a date so it can be passed to the date input
 */
const formatDateForInput = value => {
  const d = new Date(value);
  return `${d.getFullYear()}-${with2Digits(d.getMonth() + 1)}-${with2Digits(
    d.getDate()
  )}`;
};

const formatDateForDisplay = value => {
  const d = new Date(value);
  return `${with2Digits(d.getDate())}/${with2Digits(
    d.getMonth() + 1
  )}/${d.getFullYear()}`;
};

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

class DatePicker extends React.Component {
  handleOnChange = e => {
    const value = e.target.value;
    const { onChange } = this.props;

    onChange(value ? new Date(value).toISOString() : undefined);
  };

  handleOnKeyDown = e => {
    const relevantKey = e.altKey || e.key === 'Tab' || e.key === 'Escape';
    if (!relevantKey) {
      e.preventDefault();
    }
  };

  render() {
    const { value, ...inputProps } = this.props;

    const date = new Date(value);
    const dateValue = isValidDate(date) ? formatDateForInput(date) : '';
    return (
      <input
        {...inputProps}
        type="date"
        value={dateValue}
        onChange={this.handleOnChange}
        onKeyDown={this.handleOnKeyDown}
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
  const displayValues = formatAvailableValues(
    variable,
    10,
    ',',
    formatDateForDisplay
  );

  return `${formatDateForDisplay(
    removedAssignment.value.value
  )} is not valid. Available values are [${displayValues}]`;
}

/**
 * `<DateInput>` component that knows about the data from the
 *  `/configure` API.
 */
class DateInput extends React.Component {
  handleOnChange = value => {
    const { variable, onAssign, onUnassign } = this.props;

    value ? onAssign(variable.id, value) : onUnassign(variable.id);
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

    let displayValue = removedAssignment
      ? removedAssignment.value.value
      : assignedValue;

    return (
      <div className="date-input">
        <DatePicker
          className={className}
          type="date"
          value={displayValue}
          onChange={this.handleOnChange}
        />
        <div className="date-input-help">{message}</div>
      </div>
    );
  }
}

export default DateInput;
