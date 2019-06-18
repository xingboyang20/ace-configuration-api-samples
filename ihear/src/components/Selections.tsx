import React from 'react';
import { Section } from '../api/types';
import { getAssignedValue } from '../api/variable';
import classnames from 'classnames';

type SelectionsProps = {
  sections: Section[];
  layout: 'small' | 'large';
};

const Selections: React.SFC<SelectionsProps> = ({ sections, layout }) => (
  <div className="selections">
    {sections.map(section => (
      <React.Fragment key={section.id}>
        <h6 className="section-name">{section.name}</h6>

        <section>
          {section.sections[0].variables.map(variable => {
            const assignedValue = getAssignedValue(variable);

            const className = classnames('assignment', {
              'user-assignment':
                assignedValue && assignedValue.assigned === 'byUser'
            });

            return (
              <div key={variable.id} className={className}>
                <span className="variable-name">{variable.name}</span>
                <span className="value-name">
                  {assignedValue ? assignedValue.name : ''}
                </span>
              </div>
            );
          })}
        </section>
      </React.Fragment>
    ))}
    <style jsx>{`
      h6 {
        font-size: ${layout === 'small' ? '12px' : '16px'};
        margin: 1.5em 0 0.8em 0;
      }
      .selections {
        background-color: ${layout === 'small'
          ? 'rgba(255, 255, 255, 0.7)'
          : 'unset'};
        padding: ${layout === 'small' ? '12px 24px' : '0'};
        font-size: ${layout === 'small' ? '12px' : '14px'};
      }

      section {
      }
      .assignment {
        line-height: 1.8em;
        display: flex;
        justify-content: space-between;
      }
      .user-assignment > .value-name {
        font-weight: 600;
      }
      .user-assignment > .value-name:after {
        content: '✓';
        margin-left: 2px;
      }
    `}</style>
  </div>
);

export default Selections;
