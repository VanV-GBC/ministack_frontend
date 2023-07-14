import React from 'react'
import AddSchedule from './components/addSchedule/AddSchedule'
import ScheduleList from './components/scheduleList/ScheduleList'
import EditSchedule from './components/editSchedule/EditSchedule'
import { BrowserRouter, Switch, Route } from 'react-router-dom';  
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
                        <h4 className="PageHeading light-text">Home</h4>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
        </>
    )
}

export default App