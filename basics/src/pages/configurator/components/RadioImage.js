import React from 'react';
import classnames from 'classnames';
import './RadioImage.css';
import { getAssignedValue } from '../utils/variable-utils';

function Image({ value, onAssign }) {
  const { name } = value;

  const className = classnames({
    image: true,
    'image-incompatible': value.incompatible,
    'image-assigned': value.assigned
  });

  return (
    <div className={className} onClick={() => onAssign(value)}>
      <div className="img-wrap">
        <img
          alt={value.value}
          src={process.env.PUBLIC_URL + `/${value.value}.png`}
        />
      </div>
      {name}
    </div>
  );
}

export default class RadioImage extends React.Component {
  handleOnAssign = v => {
    const { variable, onAssign, onUnassign } = this.props;
    const assignedValue = getAssignedValue(variable);
    assignedValue === v && v.assigned === 'byUser'
      ? onUnassign(variable)
      : onAssign(variable, v);
  };

  render() {
    const { variable } = this.props;

    return (
      <div className="image-toggle">
        {variable.values.map((value, i) => (
          <Image
            key={`${value.value}-${i}`}
            value={value}
            onAssign={this.handleOnAssign}
          />
        ))}
      </div>
    );
  }
}
