import React from 'react';
import Dropdown from './Dropdown';
import TextInput from './TextInput';
import MultivaluedInput from './MultivaluedInput';
import DateInput from './DateInput';
import RadioImage from './RadioImage';

/**
 * Render different "input" controls dependent on variable type.
 *
 * * `<MultivalidInput>` is rendered if `variable.allowMutipleAssignments` is true.
 * * `<TextInput>` is rendered for number values with distinct value count greater than 25.
 * * `<TextInput>` is rendered for string values with no distinct value count.
 * * `<DropDown>` is rendered for everything else.
 */
export default function VariableInput({
  variable,
  onAssign,
  onUnassign,
  removedAssignments
}) {
  if (variable.id === 'GENDER') {
    return (
      <RadioImage
        variable={variable}
        onAssign={onAssign}
        onUnassign={onUnassign}
      />
    );
  }
  if (variable.allowMultipleAssignments) {
    return (
      <MultivaluedInput
        variable={variable}
        onAssign={onAssign}
        onUnassign={onUnassign}
      />
    );
  }
  if (variable.valueType === 'Date') {
    return (
      <DateInput
        variable={variable}
        onAssign={onAssign}
        onUnassign={onUnassign}
        removedAssignments={removedAssignments}
      />
    );
  }
  if (variable.valueType === 'Number' && variable.distinctValueCount > 25) {
    return (
      <TextInput
        variable={variable}
        onAssign={onAssign}
        onUnassign={onUnassign}
        removedAssignments={removedAssignments}
      />
    );
  }
  if (variable.valueType === 'String' && !variable.distinctValueCount) {
    return (
      <TextInput
        variable={variable}
        onAssign={onAssign}
        onUnassign={onUnassign}
        removedAssignments={removedAssignments}
      />
    );
  }
  return (
    <Dropdown variable={variable} onAssign={onAssign} onUnassign={onUnassign} />
  );
}
