import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MasterDesignFrame } from './figmaComponents';
import registerServiceWorker from './registerServiceWorker';
import { Route, Switch, BrowserRouter} from 'react-router-dom';
import Icons from './components/Icons';

class App extends Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={MasterDesignFrame}/>
                    <Route path='/icons' component={Icons}/>
                </Switch>
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
            <App/>
    </BrowserRouter>, 
    document.body);
registerServiceWorker();
