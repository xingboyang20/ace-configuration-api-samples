export type Assignment = {
  variableId: string;
  value?: string | number;
  valueName?: string;
  variableName?: string;
};

export type IncompatibleAssignment = {
  variable: Variable;
  value: Value;
};

export type Value = {
  name: string;
  value: string;
  incompatible: boolean;
  assigned?: 'byRule' | 'byPhase' | 'byDefault' | 'byUser';
  excluded?: Value;
  state: 'Available' | 'Unavailable' | 'Selected' | 'Inferred';
  justification: 'None' | 'Rule' | 'Assignment' | 'Default' | 'Phase';
};

export type Variable = {
  id: string;
  name: string;
  valueType: 'String' | 'Number' | 'Date';
  distinctValueCount: Number;
  allowMultipleAssignments: 6;
  values: Value[];
  properties: Property[];
};

export type Property = {
  id: string;
  value: any;
  type: 'String' | 'Number' | 'Date';
};

export type Section = {
  id: string;
  name: string;
  variables?: Variable[];
  sections?: Section[];
};
