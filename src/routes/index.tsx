import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Inquiry from '../pages/Inquiry';
import Performance from '../pages/Performance';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/:category/question" component={Inquiry}/>
        <Route path="/:category/performance" component={Performance}/>
    </Switch>
);

export default Routes;
