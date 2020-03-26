import React from "react";
import {
  useField,
  FieldAttributes
} from "formik";
import {
  TextField
} from "@material-ui/core";

const TextInput: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default TextInput;
