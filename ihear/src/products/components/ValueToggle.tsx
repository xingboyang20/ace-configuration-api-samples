import React from 'react';
import { IncompatibleAssignment, Value } from '../../api/types';
import Button from '../../components/Button';
import IncompatibleTooltip from './IncompatibleTooltip';
import { Tooltip } from 'react-tippy';
import icons from '../lib/icons';
import { ReactComponent as AlertIcon } from '../../components/Icons/Alert.svg';

export type ValueToggleProps = {
  value: Value;
  onAssign: (
    value: Value,
    removedAssignments?: IncompatibleAssignment[]
  ) => void;
  onUnassign: (value: Value) => void;
  onCheckRemovedAssignments: (
    value: Value
  ) => Promise<IncompatibleAssignment[]>;
};
class ValueToggle extends React.Component<ValueToggleProps> {
  handleClick = () => {
    const { value, onAssign, onUnassign } = this.props;
    if (value.incompatible) {
      return;
    }
    const isUserAssigned = value.assigned === 'byUser';

    if (isUserAssigned) {
      onUnassign(value);
    } else {
      onAssign(value);
    }
  };

  render() {
    const { value, onAssign, onCheckRemovedAssignments } = this.props;
    const isUserAssigned = value.assigned === 'byUser';

    const Icon = icons[value.value];
    const toggle = (
      <div className="panel">
        <Button
          color="light"
          isSelected={!!value.assigned}
          onClick={this.handleClick}
        >
          {Icon && (
            <div className="icon">
              <Icon.Component width="18px" height="18px" {...Icon.props} />
            </div>
          )}
          {value.name} {isUserAssigned ? '✓' : ''}{' '}
          {value.incompatible ? (
            <AlertIcon width="12px" height="12px" stroke="currentColor" />
          ) : (
            ''
          )}
        </Button>
        <style jsx>{`
          .panel {
            display: inline-block;
            margin-right: 24px;
            margin-bottom: 20px;
          }
          .icon {
            display: inline-block;
            vertical-align: sub;
            margin-right: 6px;
          }
        `}</style>
      </div>
    );
    return value.incompatible ? (
      <Tooltip
        interactive={true}
        trigger="click"
        arrow={true}
        delay={300}
        animation="fade"
        theme="light"
        html={
          <IncompatibleTooltip
            value={value}
            onCheckRemovedAssignments={onCheckRemovedAssignments}
            onAssign={onAssign}
          />
        }
      >
        {toggle}
      </Tooltip>
    ) : (
      toggle
    );
  }
}

export default ValueToggle;
