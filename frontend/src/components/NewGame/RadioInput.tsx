import React from "react";
import {
    useField,
    FieldAttributes
} from "formik";
import {
    Radio,
    FormControlLabel
} from "@material-ui/core";

type RadioTypes = { label: string } & FieldAttributes<{}>;

const RadioInput: React.FC<RadioTypes> = ({ label, ...props }) => {
    const [field] = useField<{}>(props);
    return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

export default RadioInput;