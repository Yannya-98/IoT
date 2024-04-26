import './App.css';
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PrivateRoute from "./route/PrivateRoute";
import {Route, Switch} from "react-router-dom";
import React from "react";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path={'/main'} component={MainPage}/>
                <Route path={'/login'} component={LoginPage}/>
                <Route path={'/register'} component={RegisterPage} />
                <PrivateRoute path={'/'} component={MainPage}/>
            </Switch>
        </div>
    );
}

export default App;
