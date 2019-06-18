import React from 'react';
import { IncompatibleAssignment, Value } from '../../api/types';
import Button from '../../components/Button';
import * as theme from '../../components/theme';

type IncompatibleTooltipProps = {
  value: Value;
  onCheckRemovedAssignments: (
    value: Value
  ) => Promise<IncompatibleAssignment[]>;
  onAssign: () => void;
};

type IncompatibleTooltipState = {
  removedAssignments: IncompatibleAssignment[];
};
export default class IncompatibleTooltip extends React.Component<
  IncompatibleTooltipProps,
  IncompatibleTooltipState
> {
  state = {
    removedAssignments: []
  };
  async componentDidMount() {
    const { value, onCheckRemovedAssignments } = this.props;
    const removedAssignments = await onCheckRemovedAssignments(value);
    this.setState({ removedAssignments });
  }
  render() {
    const { value, onAssign } = this.props;
    const { removedAssignments } = this.state;

    console.log(removedAssignments.map(ra => console.log(ra)));

    if (removedAssignments.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <div className="tooltip">
        <div className="title">
          Choosing <span className="entity">{value.name}</span> removes
        </div>
        <div className="content">
          <ul>
            {removedAssignments.map(ra => (
              <li key={ra.variable.id}>
                <span className="entity">{ra.value.name}</span>
                &nbsp;from&nbsp;
                <span className="entity">{ra.variable.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer">
          <Button color="light" onClick={onAssign}>
            Choose anyway
          </Button>
        </div>
        <style jsx>{`
          div {
            color: ${theme.TEXT_COLOR};
            font-size: 14px;
          }
          .entity {
            font-weight: 600;
          }
          .title {
            padding: 24px 24px 2px 24px;
          }
          .content {
            padding: 0px 24px 6px 42px;
          }
          .footer {
            padding: 0px 24px 10px 42px;
            text-align: right;
          }
          ul {
            padding: 0;
          }
        `}</style>
      </div>
    );
  }
}
