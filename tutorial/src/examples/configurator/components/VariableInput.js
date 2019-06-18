import React from 'react';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
import MultivaluedInput from './MultivaluedInput';

let VariableInput = ({ variable, onAssign, onUnassign }) => {
  if (variable.allowMultipleAssignments) {
    return (
      <MultivaluedInput
        variable={variable}
        onAssign={onAssign}
        onUnassign={onUnassign}
      />
    );
  }
  if (variable.valueType === 'Number' && variable.distinctValueCount > 25) {
    return (
      <TextInput
        variable={variable}
        onAssign={onAssign}
        onUnassign={onUnassign}
      />
    );
  }
  if (variable.valueType === 'String' && !variable.distinctValueCount) {
    return (
      <TextInput
        variable={variable}
        onAssign={onAssign}
        onUnassign={onUnassign}
      />
    );
  }
  return (
    <Dropdown variable={variable} onAssign={onAssign} onUnassign={onUnassign} />
  );
};

export default VariableInput;
