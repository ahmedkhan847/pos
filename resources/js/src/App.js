import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./config/theme";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";
import UserContainer from "./context-containers/UserContainer";

function App() {
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Router>
                    <UserContainer>
                        <Main />
                    </UserContainer>
                </Router>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
