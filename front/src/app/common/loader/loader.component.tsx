import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";

export function LoaderComponent() {
    return <LinearProgress color="secondary" style={{height: 5, width: '100%'}}/>
}