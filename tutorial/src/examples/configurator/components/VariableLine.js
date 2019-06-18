import React from 'react';
import classnames from 'classnames';
import { Error, Clear } from '../../../components/Icons';
import VariableInput from './VariableInput';
import IconButton from './IconButton';
import {
  hasUserAssignedValue,
  isRequiredWithoutAssignment
} from '../utils/variable-utils';
import './VariableLine.css';

const UnassignButton = ({ variable, onUnassign }) => (
  <IconButton
    style={{ padding: '5px 0 0 4px' }}
    title={`Remove assignment to ${variable.name}`}
    onClick={() => onUnassign(variable.id)}
  >
    <Clear width="12px" height="12px" />
  </IconButton>
);

const RequiredMark = () => <strong title="Required">(*)</strong>;

const issuesToString = (issues = []) => issues.map(i => i.message).join('\n');

const VariableLine = ({ variable, onAssign, onUnassign }) => {
  const className = classnames('variable-line', {
    VariableLine__invalid: variable.issues
  });

  return (
    <div className={className}>
      <div className="variable-line__text">
        {isRequiredWithoutAssignment(variable) ? (
          <span>
            {variable.name} <RequiredMark />
          </span>
        ) : (
          <span>{variable.name}</span>
        )}
        {variable.issues && (
          <div
            className="variable-line__invalid-mark"
            title={issuesToString(variable.issues)}
          >
            <Error width={16} height={16} />
          </div>
        )}
      </div>
      <div className="variable-line__input">
        <VariableInput
          variable={variable}
          onAssign={onAssign}
          onUnassign={onUnassign}
        />
      </div>
      <div className="variable-line__actions">
        {hasUserAssignedValue(variable) && (
          <UnassignButton variable={variable} onUnassign={onUnassign} />
        )}
      </div>
    </div>
  );
};

export default VariableLine;
