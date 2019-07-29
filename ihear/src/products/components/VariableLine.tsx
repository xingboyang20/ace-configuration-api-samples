import React from 'react';
import {
  Assignment,
  IncompatibleAssignment,
  Variable,
  Value
} from '../../api/types';
import ValueToggle from './ValueToggle';
import descriptions from '../lib/descriptions';
import * as theme from '../../components/theme';

type VariableLineProps = {
  variable: Variable;
  onAssign: (assignment: Assignment) => void;
  onUnassign: (assignment: Assignment) => void;
  onCheckRemovedAssignments: (
    assignment: Assignment
  ) => Promise<IncompatibleAssignment[]>;
};

const VariableLine: React.SFC<VariableLineProps> = ({
  variable,
  onAssign,
  onUnassign,
  onCheckRemovedAssignments
}) => {
  const description = descriptions[variable.id];
  return (
    <div className="variable-line">
      <h5 className="name">{variable.name}</h5>
      {description && <div className="description">{description}</div>}
      <div>
        {variable.values.map(value => (
          <ValueToggle
            key={value.value}
            onAssign={(value: Value) =>
              onAssign({ variableId: variable.id, value: value.value })
            }
            onUnassign={(value: Value) =>
              onUnassign({ variableId: variable.id, value: value.value })
            }
            onCheckRemovedAssignments={(value: Value) =>
              onCheckRemovedAssignments({
                variableId: variable.id,
                value: value.value
              })
            }
            value={value}
          />
        ))}
      </div>
      <style jsx>{`
        .name {
          margin-bottom: 0.67em;
        }
        .description {
          margin-bottom: 1.67em;
          font-size: 0.93em;
          color: ${theme.BRAND_COLOR_TRANS_90};
        }
      `}</style>
    </div>
  );
};

export default VariableLine;
