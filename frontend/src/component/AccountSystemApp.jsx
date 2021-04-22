import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MeetupsComponent from './MeetupsComponent';
import NewMeetupComponent from './NewMeetupComponent';
import LoginComponent from './LoginComponent';




class AccountSystemApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1 style={{textAlign:"center", color: "green"}}>Happy Beer Meetup</h1>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" exact component={LoginComponent} />
                        <Route path="/happybeermeetups" exact component={MeetupsComponent} />
                        <Route path="/happybeermeetups/meetup" component={NewMeetupComponent} />
                    </Switch>
                </>
            </Router>
      )
    }
}

export default AccountSystemApp