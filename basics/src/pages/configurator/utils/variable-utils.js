/**
 * Utilities for interacting with `variables` from the
 * `/configure` response
 */

/**
 * Get all values for `variable` that have a state.
 *
 * If `variable.allowMultipleAssignments` then returned array contains both
 * excluded and included values.
 */
const getValuesWithState = variable =>
  variable.allowMultipleAssignments
    ? [].concat(...variable.values.map(v => [v, v.excluded]))
    : variable.values;

/**
 * Get the first value assigned to the variable.
 */
export const getAssignedValue = variable =>
  variable.values.find(v => v.assigned);

/**
 * Does the variable have an assigned value.
 */
export const hasAssignedValue = variable =>
  getValuesWithState(variable).some(v => v.assigned);

/**
 * Does the variable have any system assigned value.
 */
export const hasSystemAssignedValue = variable =>
  getValuesWithState(variable).some(v => v.assigned === 'bySystem');

/**
 * Does the variable have any user assigned value.
 */
export const hasUserAssignedValue = variable => {
  return getValuesWithState(variable).some(v => v.assigned === 'byUser');
};

/**
 * Get variable property with id or undefined if variable doesn't have
 * a property with *name*
 */
export const getProperty = (variable, id) =>
  variable.properties.find(p => p.id === id);

/**
 * Is variable required, but have no assigned value.
 */
export const isRequiredWithoutAssignment = variable =>
  !hasAssignedValue(variable) &&
  (getProperty(variable, 'required') || {}).value;

/**
 * Should the variable be shown (have a show property with a true value).
 */
export const showVariable = variable =>
  (getProperty(variable, 'show') || { value: true }).value;
