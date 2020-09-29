import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import './input.css'
import {useState, useEffect} from "react";

export function InputComponent({initialValue = null, type, onChange=(_)=>null, error = false, errorText = null, label = null}) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        if (e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            setValue(value);
        }
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleBlur = () => {
        onChange(value);
    };

    return <TextField className="fd-input"
                      type={type}
                      error={error}
                      label={label}
                      helperText={error ? errorText : null}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={value}>
    </TextField>
}