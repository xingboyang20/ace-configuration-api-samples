import React from 'react';
import Label from './Label';
import TextInput from './TextInput';

type FormFieldProps = {
  label: string;
  placeholder: string;
};

function FormField({ label, placeholder }: FormFieldProps) {
  return (
    <div className="form-field">
      <Label text={label}>
        <div className="input-block">
          <TextInput placeholder={placeholder} />
        </div>
      </Label>
      <style jsx>{`
        .input-block {
          display: flex;
        }

        .form-field {
          margin-bottom: 26px;
          display: block;
        }
      `}</style>
    </div>
  );
}

export default FormField;
