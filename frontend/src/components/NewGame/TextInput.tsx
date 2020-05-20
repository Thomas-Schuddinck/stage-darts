import React from "react";
import {
  useField,
  FieldAttributes
} from "formik";
import {
  TextField, withStyles
} from "@material-ui/core";

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#0d84d9',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#0d84d9',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0d84d9',
      },
      '&:hover fieldset': {
        borderColor: '#0d84d9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0d84d9',
      },
    },
  },
})(TextField);


const TextInput: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <CssTextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default TextInput;
