import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import './input.css'

export function InputComponent({type, onChange=(_)=>null, error = false, errorText = null}) {
    return <TextField className="fd-input" type={type} onChange={e=>onChange(e.target.value)}
                      error={error} helperText={error ? errorText : null}/>
}