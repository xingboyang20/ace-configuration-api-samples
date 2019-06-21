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

/**
 * Components that can render a "line" in the Configurator.
 * A line consist of
 *
 * * The variable name
 * * The Control for assigning values, e.g. <Dropdown>
 * * An Unassign button
 */

/**
 * Button for un assigning all values from a variables
 */
function UnassignButton({ variable, onUnassign }) {
  return (
    <IconButton
      style={{ padding: '5px 0 0 4px' }}
      title={`Remove assignment to ${variable.name}`}
      onClick={() => onUnassign(variable.id)}
    >
      <Clear width="12px" height="12px" />
    </IconButton>
  );
}

/**
 * Render a (*)
 */
const RequiredMark = ({ variable }) => {
  if (isRequiredWithoutAssignment(variable)) {
    return <strong title="Required">(*)</strong>;
  }
  return null;
};

/**
 * Render any potential issues for a variable
 */
function Issues({ variable }) {
  if (!variable.issues) {
    return null;
  }
  const issueString = variable.issues.map(i => i.message).join('\n');
  return (
    <div className="variable-line-invalid-mark" title={issueString}>
      <Error width={16} height={16} />
    </div>
  );
}

/**
 * `<VariableLine>` component renders
 *
 * * The variable name
 * * The Control for assigning values, e.g. <Dropdown>
 * * An Unassign button
 */
function VariableLine({ variable, removedAssignments, onAssign, onUnassign }) {
  const className = classnames('variable-line', {
    'variable-line-invalid': variable.issues
  });

  return (
    <div className={className}>
      <div className="variable-line-text">
        {variable.name} <RequiredMark variable={variable} />
        <Issues variable={variable} />
      </div>
      <div className="variable-line-input">
        <VariableInput
          removedAssignments={removedAssignments}
          variable={variable}
          onAssign={onAssign}
          onUnassign={onUnassign}
        />
      </div>
      <div className="variable-line-actions">
        {hasUserAssignedValue(variable) && (
          <UnassignButton variable={variable} onUnassign={onUnassign} />
        )}
      </div>
    </div>
  );
}

export default VariableLine;
