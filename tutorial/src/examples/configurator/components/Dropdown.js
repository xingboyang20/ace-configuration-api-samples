import React from 'react';
import classnames from 'classnames';
import {
  getAssignedValue,
  hasSystemAssignedValue
} from '../utils/variable-utils';
import './Dropdown.css';

const NO_VALUE = 'NO_VALUE';

const Option = ({ value }) => {
  const { name } = value;

  const className = classnames({
    'dropdown--incompatible': value.incompatible
  });

  return (
    <option className={className} value={value.value}>
      {name}
    </option>
  );
};

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const { variable, onAssign, onUnassign } = this.props;

    const { value } = e.target;

    value === NO_VALUE ? onUnassign(variable.id) : onAssign(variable.id, value);
  }

  render() {
    const { variable } = this.props;
    const assignedValue = (
      getAssignedValue(variable) || {
        value: NO_VALUE
      }
    ).value;

    return (
      <select
        className="dropdown"
        value={assignedValue}
        onChange={this.handleOnChange}
      >
        {!hasSystemAssignedValue(variable) && (
          <option key={NO_VALUE} value={NO_VALUE} />
        )}
        {variable.values.map(value => (
          <Option key={value.value} value={value} />
        ))}
      </select>
    );
  }
}
