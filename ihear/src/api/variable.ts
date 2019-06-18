import { Variable, Value } from './types';

/**
 * Get all values for `variable` that have a state.
 *
 * If `variable.allowMultipleAssignments` then returned array contains both
 * excluded and included values.
 */
const getValuesWithState = (variable: Variable) =>
  variable.allowMultipleAssignments
    ? ([] as Value[]).concat(
        ...variable.values.map(v => [v, v.excluded as Value])
      )
    : variable.values;

/**
 * Get all values that can be assigned. Necessary until the CLM Cloud APIs gets
 * updated to use VT SDK 2.0
 */
export const getAssignableValues = (variable: Variable): Value[] =>
  variable.values.filter(
    value => !(value.state === 'Unavailable' && value.justification === 'Phase')
  );

/**
 * Get the first value assigned to the variable.
 */
export const getAssignedValue = (variable: Variable) =>
  variable.values.find(v => !!v.assigned);

/**
 * Does the variable have an assigned value.
 */
export const hasAssignedValue = (variable: Variable) =>
  getValuesWithState(variable).some(v => !!v.assigned);

/**
 * Does the variable have any system assigned value.
 */
export const hasSystemAssignedValue = (variable: Variable) =>
  getValuesWithState(variable).some(v => v.assigned === 'bySystem');

/**
 * Does the variable have any user assigned value.
 */
export const hasUserAssignedValue = (variable: Variable) => {
  return getValuesWithState(variable).some(v => v.assigned === 'byUser');
};

/**
 * Get variable property with id or undefined if variable doesn't have
 * a property with *name*
 */
export const getProperty = (variable: Variable, id: string) =>
  variable.properties.find(p => p.id === id);

/**
 * Is variable required, but have no assigned value.
 */
export const isRequiredWithoutAssignment = (variable: Variable) =>
  !hasAssignedValue(variable) &&
  (getProperty(variable, 'required') || { value: '' }).value;

/**
 * Should the variable be shown (have a show property with a true value).
 */
export const showVariable = (variable: Variable) =>
  (getProperty(variable, 'show') || { value: true }).value;
