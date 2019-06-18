/**
 * Are two assignments equal
 */
const assignmentEq = (as1, as2) => {
  if (as1.value) {
    return as1.variableId === as2.variableId && as1.value === as2.value;
  }
  return as1.variableId === as2.variableId;
};

/**
 * Returns new assignments array, where the previous assignment have
 * been removed.
 */
export const unassign = (variableAssignments, assignment) => {
  return variableAssignments.filter(a => !assignmentEq(assignment, a));
};

/**
 * Return a new assignments array, where the assignment have been added.
 * For single value variables any previous assignment to the
 * assignment.variable is removed.
 */
export const assign = (variableAssignments, assignment, multivalued) => {
  let assignmentToRemove = assignment;
  if (!multivalued) {
    assignmentToRemove = { variableId: assignment.variableId };
  }
  return [
    ...unassign(variableAssignments, assignmentToRemove, multivalued),
    assignment
  ];
};

/**
 * Return a new assignments array, where assignments to phases
 * after and including phase have been removed.
 */
export const reset = () => [];
