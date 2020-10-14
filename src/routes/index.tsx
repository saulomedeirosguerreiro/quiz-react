import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Question from '../pages/Question';
import Performance from '../pages/Performance';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/question" component={Question}/>
        <Route path="/performance" component={Performance}/>
    </Switch>
);

export default Routes;
