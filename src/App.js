import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import { withStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header, Sidebar } from "components";

import routes from "./routes";

import appStyle from "variables/styles/appStyle.jsx";

import logo from "assets/img/logo.svg";
import background from "assets/img/bg.jpg";

import Websocket from "react-websocket";
import Emitter from "./emitter";

const ws = `ws://${window.location.host}/__cupidon`;
const api = extension => async (query, params = {}) => axios.get(`query`, { params: { ext: extension, query, ...params } });

class App extends React.Component {
    constructor() {
        super();
        this.extensions = {};
        this.emitters = {};
    }

    state = {
        mobileOpen: false
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    componentDidUpdate() {
        this.refs.mainPanel.scrollTop = 0;
    }

    getEmitter = ext => {
        if (!this.emitters[ext]) {
            this.emitters[ext] = new Emitter();
        }

        return this.emitters[ext];
    };

    handleMessage = message => {
        try {
            const { ext, data } = JSON.parse(message);
            const emitter = this.getEmitter(ext);
            if (emitter) {
                emitter.emit(data);
            }
        } catch (e) {
            console.error("Error parsing message : ", message);
        }
    };

    switcher() {
        return (
            <Switch>
                {routes.map((prop, key) => {
                    const Component = prop.component;
                    const ref = "ext_" + prop.ext;
                    if (prop.redirect) return <Redirect from={prop.path} to={prop.to} key={key} />;

                    return (
                        <Route
                            path={prop.path}
                            component={() => (
                                <Component
                                    api={api(prop.ext)}
                                    emitter={this.getEmitter(prop.ext)}
                                    ref={instance => (this.extensions[ref] = instance)}
                                />
                            )}
                            key={key}
                        />
                    );
                })}
            </Switch>
        );
    }

    render() {
        const { classes, ...rest } = this.props;

        return (
            <div className={classes.wrapper}>
                <CssBaseline />
                <Websocket url={ws} onMessage={message => this.handleMessage(message)} />
                <Sidebar
                    routes={routes}
                    logoText={"Love Js"}
                    logo={logo}
                    image={background}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="love"
                    {...rest}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Header routes={routes} handleDrawerToggle={this.handleDrawerToggle} {...rest} />
                    <div className={classes.content}>
                        <div className={classes.container}>{this.switcher()}</div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
