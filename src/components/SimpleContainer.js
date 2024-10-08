import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

export default function SimpleContainer(props) {
    return (
        <React.Fragment>
            {/* <CssBaseline /> */}
            <Container maxWidth={props.maxWidth}>
                {props.children}
            </Container>
        </React.Fragment>
    );
}
