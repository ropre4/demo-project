import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import './input.css'

export function InputComponent({type}) {
    return <TextField className="fd-input" type={type}/>
}