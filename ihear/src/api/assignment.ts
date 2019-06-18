import { Assignment } from './types';
/**
 * Are two assignments equal
 */
export const assignmentEq = (as1: Assignment, as2: Assignment) => {
  if (as1.value) {
    return as1.variableId === as2.variableId && as1.value === as2.value;
  }
  return as1.variableId === as2.variableId;
};

export const without = (
  assignments: Assignment[],
  removedAssignments: Assignment[]
) => {
  return assignments.filter(
    a => !removedAssignments.find(ra => assignmentEq(a, ra))
  );
};

/**
 * Returns new assignments array, where the previous assignment have
 * been removed.
 */
export const unassign = (
  assignment: Assignment,
  variableAssignments: Assignment[]
) => variableAssignments.filter(a => !assignmentEq(assignment, a));

type AssignFn = (
  assignment: Assignment,
  variableAssignments: Assignment[],
  multivalued?: boolean
) => Assignment[];

/**
 * Return a new assignments array, where the assignment have been added.
 * For single value variables any previous assignment to the
 * assignment.variable is removed.
 */
export const assign: AssignFn = (
  assignment,
  variableAssignments,
  multivalued
) => {
  let assignmentToRemove = assignment;
  if (!multivalued) {
    assignmentToRemove = { variableId: assignment.variableId };
  }
  return [...unassign(assignmentToRemove, variableAssignments), assignment];
};
