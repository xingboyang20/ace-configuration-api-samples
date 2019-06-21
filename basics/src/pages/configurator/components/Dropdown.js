import React from 'react';
import classnames from 'classnames';
import {
  getAssignedValue,
  hasSystemAssignedValue
} from '../utils/variable-utils';
import './Dropdown.css';

const NO_VALUE_VALUE = 'NO_VALUE';
const NO_VALUE = { value: NO_VALUE_VALUE };

/**
 * Single option in a `<Dropdown>`.
 */
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

/**
 * A `<Dropdown>` component that knows about the data from
 * the `/configure` API
 */
export default class Dropdown extends React.Component {
  /**
   * When an option is selected in the `<Dropdown>` this handler function
   * is called. If the option is the empty option we call `onUnassign` otherwise
   * we call `onAssign` with the selected option value
   */
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
        {!hasSystemAssignedValue(variable) && (
          <option key={NO_VALUE} value={NO_VALUE} />
        )}
        {variable.values.map((value, i) => (
          <Option key={`${value.value}-${i}`} value={value} />
        ))}
      </select>
    );
  }
}
