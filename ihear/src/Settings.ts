import React from 'react';

export type SettingsType = {
  packagePath: string;
};

export const InitialSettings = {
  packagePath: process.env.REACT_APP_PACKAGE_PATH
};

export const SettingsContext = React.createContext<SettingsType>(
  InitialSettings
);
