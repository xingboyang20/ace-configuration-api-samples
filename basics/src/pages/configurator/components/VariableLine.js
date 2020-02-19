import React from 'react';
import classnames from 'classnames';
import { Clear } from '../../../components/Icons';
import VariableInput from './VariableInput';
import IconButton from './IconButton';
import {
  getAssignedValue,
  hasUserAssignedValue,
  isRequiredWithoutAssignment
} from '../utils/variable-utils';
import './VariableLine.css';
import InvalidMark from './InvalidMark';

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
      onClick={() => onUnassign(variable)}
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
  return <InvalidMark issues={variable.issues} />;
}

const AssignedChars = {
  byRule: 'R',
  byUser: 'U',
  byDefault: 'D',
  byPhase: 'P'
};

function AssignedByMark({ assignedValue }) {
  if (!assignedValue) {
    return <div className="assignment-mark" />;
  }
  return (
    <div className="assignment-mark assignment-mark-assigned">
      {AssignedChars[assignedValue.assigned]}
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
function VariableLine({
  variable,
  removedAssignments,
  onAssign,
  onUnassign,
  readOnly
}) {
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
        {readOnly ? (
          getAssignedValue(variable).value
        ) : (
          <>
            <AssignedByMark assignedValue={getAssignedValue(variable)} />
            <VariableInput
              removedAssignments={removedAssignments}
              variable={variable}
              onAssign={onAssign}
              onUnassign={onUnassign}
            />
          </>
        )}
      </div>
      <div className="variable-line-actions">
        {!readOnly && hasUserAssignedValue(variable) && (
          <UnassignButton variable={variable} onUnassign={onUnassign} />
        )}
      </div>
    </div>
  );
}

export default VariableLine;
