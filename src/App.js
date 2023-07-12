import React from 'react'
import AddSchedule from './AddSchedule'
import ScheduleList from './ScheduleList'
import EditSchedule from './EditSchedule'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';  
import './App.css'

import MinistackjsNavbar from './MinistackjsNavBar';

function App() {
    return (
        <>
        <MinistackjsNavbar/>

        <BrowserRouter forceRefresh={true}>
            
            <div className="container">
                <Switch>
                    <Route path="/ScheduleList"><ScheduleList /></Route>
                    <Route path="/AddSchedule" component={AddSchedule} />
                    <Route path='/edit/:id' component={EditSchedule} />  
                    <Route exact path="/">
                        <h4 className="PageHeading">Home</h4>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
        </>
    )
}

export default App