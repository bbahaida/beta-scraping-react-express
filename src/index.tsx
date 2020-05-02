import * as React from 'react';
import * as ReactDOM from "react-dom";
import moment from 'moment';
import 'moment/locale/fr'

import App from './App';
import "./styles.scss";

moment().locale('fr');
var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
