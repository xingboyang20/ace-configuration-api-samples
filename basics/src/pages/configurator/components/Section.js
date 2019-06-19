import React from 'react';
import VariableLine from './VariableLine';
import { showVariable } from '../utils/variable-utils';
import './Section.css';

/**
 * `<Section>` component that renders a section from the
 * configure response.
 *
 * A section is rendered by rendering a `<VariableLine>` for variable in
 * the section.
 *
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
