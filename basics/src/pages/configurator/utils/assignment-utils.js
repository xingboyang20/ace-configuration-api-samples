/**
 * Utilities for dealing with assignments which are input
 * to the `/configure` API
 */

/**
 * Are two assignments equal
 */
const assignmentEq = (as1, as2) => {
  if (as1.value) {
    return (
      as1.variable.id === as2.variable.id && as1.value.value === as2.value.value
    );
  }
  return as1.variable.id === as2.variable.id;
};

/**
 * Convert variable, value, exclude flag to assignment object
 * ready for configuration requests
 */
export const toAssignment = (variable, value) => ({
  variable: {
    id: variable.id,
    name: variable.name,
    valueType: variable.valueType,
    allowMultipleAssignments: variable.allowMultipleAssignments
  },
  value: value
    ? {
        value: value.value,
        name: value.name,
        exclude: value.exclude
      }
    : undefined
});

/**
 * Returns new assignments array, where the assignments have been removed.
 */
export const removeAssignments = (variableAssignments, assignments) => {
  return variableAssignments.filter(
    va => !assignments.some(a => assignmentEq(a, va))
  );
};

/**
 * Returns new assignments array, where the assignment have been removed.
 */
export const unassign = (variableAssignments, assignment) => {
  return variableAssignments.filter(a => !assignmentEq(assignment, a));
};

/**
 * Return a new assignments array, where the assignment have been added.
 * For single value variables any previous assignment to the
 * assignment.variable is removed.
 */
export const assign = (variableAssignments, assignment) => {
  let assignmentToRemove = assignment;
  if (!assignment.variable.allowMultipleAssignments) {
    assignmentToRemove = { variable: { id: assignment.variable.id } };
  }
  return [...unassign(variableAssignments, assignmentToRemove), assignment];
};

/**
 * Return a new assignments array, where assignments to phases
 * after and including phase have been removed.
 */
export const reset = () => [];
