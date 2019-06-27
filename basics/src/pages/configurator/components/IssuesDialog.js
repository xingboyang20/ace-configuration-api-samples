import React from 'react';
import Button from '../../../components/Button';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import './IssuesDialog.css';

function highlightWord(word) {
  return !!word.match(/^[A-Z_]*$/);
}

/**
 * Make UPPER_CASE word bold
 */
function FormatMessage({ message }) {
  const words = message.split(' ');
  return words.map((w, i) => (
    <React.Fragment key={i}>
      {highlightWord(w) ? <strong>{w}</strong> : <span>{w}</span>}{' '}
    </React.Fragment>
  ));
}

/**
 * Display a dialog from the configuration issues
 */
export default function IssuesDialog({ issues, isOpen, onDismiss }) {
  return (
    <Dialog onDismiss={onDismiss} isOpen={isOpen}>
      <div className="issues-dialog">
        <div className="issues-content">
          <h1>Invalid configuration</h1>
          <div className="issues-lead">
            {issues.length === 1 ? '1 Issue' : `${issues.length} Issues`} found
          </div>
          <ul className="issues-list">
            {issues.map((issue, i) => (
              <li key={i}>
                <FormatMessage message={issue.message} />
              </li>
            ))}
          </ul>
        </div>
        <div className="issues-footer">
          <Button onClick={onDismiss}>OK</Button>
        </div>
      </div>
    </Dialog>
  );
}
