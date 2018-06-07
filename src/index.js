import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MasterDesignFrame } from './figmaComponents';
import registerServiceWorker from './registerServiceWorker';
import { workers } from './content';

ReactDOM.render(<MasterDesignFrame listItems={workers}/>, document.body);
registerServiceWorker();
