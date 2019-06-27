import React from 'react';
import IssuesDialog from './IssuesDialog';
import './InvalidMark.css';

/**
 * Display invalid mark if the `issues` props is set.
 *
 * When the invalid mark is clicked render a dialog that display the issues.
 */
export default class InvalidMark extends React.Component {
  state = {
    showDialog: false
  };

  render() {
    const { issues } = this.props;

    const { showDialog } = this.state;
    if (!issues) {
      return null;
    }

    return (
      <>
        <button
          className="invalid-mark"
          onClick={() => this.setState({ showDialog: !showDialog })}
        >
          Invalid ({issues.length === 1 ? '1 issue' : `${issues.length} issues`}
          )
        </button>
        <IssuesDialog
          issues={issues}
          isOpen={showDialog}
          onDismiss={() => this.setState({ showDialog: false })}
        />
      </>
    );
  }
}
