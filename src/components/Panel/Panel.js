import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const colors = {
    orange: {
        background: "linear-gradient(60deg, #ffa726, #fb8c00)",
        boxShadow: "0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)"
    },
    green: {
        background: "linear-gradient(60deg, #66bb6a, #43a047)",
        boxShadow: "0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)"
    },
    red: {
        background: "linear-gradient(60deg, #ef5350, #e53935)",
        boxShadow: "0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)"
    },
    blue: {
        background: "linear-gradient(60deg, #26c6da, #00acc1)",
        boxShadow: "0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2)"
    },
    purple: {
        background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
        boxShadow: "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)"
    }
};

const styles = theme => ({
    container: {
        marginBottom: 40,
        padding: 15
    },
    headerContainer: {
        marginTop: -30,
        marginBottm: 15
    },
    header: {
        padding: "8px 12px",
        borderRadius: 6,
        paddingRight: 25,
        display: "inline-block",
        minWidth: "50%"
    },
    title: {
        color: "#FFF",
        fontSize: 18
    },
    subtitle: {
        fontSize: 16
    },
    ...colors
});

function Panel({ color, title, subtitle, classes, children, ...props }) {
    const headerClassNames = [classes.header, classes[color || "red"]];

    return (
        <Paper elevation={2} className={classes.container}>
            <div className={classes.headerContainer}>
                <div className={headerClassNames.join(" ")}>
                    <Typography variant="title" className={classes.title}>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="subtitle" className={classes.subtitle}>
                            {subtitle}
                        </Typography>
                    )}
                </div>
            </div>
            {children}
        </Paper>
    );
}

export default withStyles(styles)(Panel);
