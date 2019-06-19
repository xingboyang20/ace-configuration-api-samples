import React from 'react';
import VariableLine from './VariableLine';
import { showVariable } from '../utils/variable-utils';
import './Section.css';

/**
 * The `<Section>` component renders a section from the
 * configure response.
 */
export function Section({ section, onAssign, onUnassign }) {
  return (
    <div>
      <h3 className="section__header">{section.name}</h3>
      {section.variables.filter(showVariable).map(variable => (
        <VariableLine
          key={variable.id}
          variable={variable}
          onAssign={onAssign}
          onUnassign={onUnassign}
        />
      ))}
    </div>
  );
}
