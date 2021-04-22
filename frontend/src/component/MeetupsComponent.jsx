import React, { Component, Fragment } from 'react';
import MeetupDataService from '../service/MeetupDataService';

class MeetupsComponent extends Component {

    constructor(props) {
        console.log('init');
        super(props)
        this.state = {
            meetups: [],
            messageResponse: '',
        }
        this.subscribe = this.subscribe.bind(this)
        this.refreshMeetups = this.refreshMeetups.bind(this)
        this.addNewMeetup = this.addNewMeetup.bind(this)

        console.log(this.state.meetups)
    }

    subscribe(meetupId) {
        MeetupDataService.subscribe(meetupId)
        .then(
            response => {
                console.log(response);
                this.refreshMeetups();
            }
        )
    }

    addNewMeetup(){
        this.props.history.push(`/happybeermeetups/meetup`)
    }

    componentDidMount() {
        this.refreshMeetups();
    }

    refreshMeetups() {
        MeetupDataService.retrieveMeetups()
            .then(
                response => {
                    console.log(response);
                    if(!response.data.error)
                        this.setState({ meetups: response.data })
                    else
                        this.setState({ messageResponse: "Error: " + response.data.error })
                }
            )
    }

    isSubscribed(meetup){
        let user = meetup.user.find(user => user.user_meetup.rol === "Suscriptor" && user.id==sessionStorage.getItem('userId'))
        return !!user
    }

    getAdmin(meetup){
        let adminUser = meetup.userAdmin;//user.find(user => "Administrator".toUpperCase().includes(user.rol.toUpperCase()))
        console.log(adminUser)
        return adminUser
    }

    getSubscribers(meetup){
        return !!meetup.user ? meetup.user.filter(user => {return user.user_meetup.rol ==='Suscriptor';}).length : "0";
    }

    getAvailableVacancy(meetup){
        return meetup.totalVacancy-this.getSubscribers(meetup);
    }

    // goBack(event){
    //     event.preventDefault();
    //     this.props.history.goBack();
    // }
    

    render() {
        return (
            <div>
                <h2 style={{color: "green"}}>Welcome {sessionStorage.getItem('isAdmin')==='true'?"Administrator":null} {sessionStorage.getItem('user')}</h2>
                <h3 style={{color: "orange"}}>All meetings</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Meetings found:</td>
                            <td>{this.state.meetups.length}</td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <table className="table" style={{width: "1250px"}}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Admin</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Temperature</th>
                                <th>Vacancies</th>
                                {
                                    sessionStorage.getItem('isAdmin')==='true'?
                                    <Fragment>
                                        <th>Subscribed</th>
                                        <th>Beers Boxes</th>
                                    </Fragment>
                                    :null
                                }
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.meetups.map(
                                    meetup =>
                                        <tr style={{color: meetup.availableVacancy===0 && !this.isSubscribed(meetup)? "red" : "green"}}
                                            key={meetup.id}>
                                            <td>{meetup.id}</td>
                                            <td>{this.getAdmin(meetup)}</td>
                                            <td>{meetup.title}</td>
                                            <td>{meetup.description}</td>
                                            <td>{meetup.location}</td>
                                            <td>{meetup.date.substring(0, 10)}</td>
                                            <td>{meetup.temperature}</td>
                                            <td>{this.getAvailableVacancy(meetup)}</td>
                                            { sessionStorage.getItem('isAdmin')==='true'?
                                                <Fragment>
                                                    {/* number of suscriber */}
                                                    <td>{this.getSubscribers(meetup)}</td>
                                                    <td>{meetup.beerBox}</td>
                                                </Fragment>
                                                :null
                                            }
                                            {/* button suscribe */}
                                            { !this.isSubscribed(meetup) && this.getAvailableVacancy(meetup)>0?
                                                    <td>
                                                        <div className="row">
                                                            <button className="btn btn-success" onClick={(e) => {this.subscribe(meetup.id)}}>Subscribe</button>
                                                        </div>
                                                    </td>
                                                :
                                                    <Fragment>
                                                        {   this.isSubscribed(meetup)?
                                                                <td>Already Subscribed</td>
                                                            :<td>No Vacancy</td>
                                                        }
                                                    </Fragment>
                                            }
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>
                <div style={{color: "red"}}>{this.state.messageResponse}</div>
                {
                    <div className="row">
                        <button onClick={this.props.history.goBack} className="btn btn-primary mr-2">Back</button>
                        {sessionStorage.getItem('isAdmin')==='true'?
                            <button className="btn btn-success" onClick={this.addNewMeetup}>New Beer Meetup</button>
                            :null
                        }
                    </div>
                }

            </div>
  
        )
    }

}

export default MeetupsComponent
