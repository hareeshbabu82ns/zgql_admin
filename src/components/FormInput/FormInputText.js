import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormInputText = ( { name, control, label, rules, ...rest } ) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={( {
        field: { onChange, value },
        fieldState: { error },
        formState,
      } ) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          {...rest}
        />
      )}
    />
  );
};

export default FormInputText