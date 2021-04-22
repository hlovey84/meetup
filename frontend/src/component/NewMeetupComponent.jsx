import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MeetupDataService from '../service/MeetupDataService';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';

class NewMeetupComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            message: 'No operation was performed'
        }
    }

    handletDateChange = startDate => this.setState({ date: startDate })

    // create(event, values) {
    //     event.preventDefault()
    //     values.date = this.state.date
    //     MeetupDataService.createMeetup(JSON.stringify(values, null, 4))
    //     .then(
    //         response => {
    //             console.log(response);
    //             if(response.data.error) {
    //                 this.setState({ message: response.data.status.message })
    //             } else {
    //                 this.props.history.push(`/happybeermeetups/`)
    //                 //this.props.history.goBack;
    //             }
    //         }
    //     )
    // }

    
    render() {
        const { date } = this.state;
        return (

            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    date: '',
                    totalVacancy: '',
                    userId: sessionStorage.getItem('userId'),
                    username: sessionStorage.getItem('user'),
                    location: '',
                    lat:'',
                    long:''
                }}

                validationSchema={Yup.object().shape({
                    title: Yup.string().required("No title provided."),
                    description: Yup.string().required("No description provided."),
                    //date: Yup.string().required("No date provided."),
                    totalVacancy: Yup.number().integer().min(1).required("No Total Vacancy provided."),
                    location: Yup.string().required("No Location provided.")
                })}


                onSubmit={fields => {
                    fields.date = this.state.date
                    MeetupDataService.createMeetup(JSON.stringify(fields, null, 4))
                    .then(
                        response => {
                            console.log(response);
                            if(response.data.error) {
                                this.setState({ message: response.data.status.message })
                            } else {
                                //this.props.history.push(`/happybeermeetups/`)
                                this.props.history.goBack();
                            }
                        }
                    )
                }}

                render={({ errors, status, touched, values }) => (
                    <div>
                        <Form>
                                <h3 style={{color: "orange"}}>New meetup</h3>
                                {/* <div className="row"> */}
                                    <div className="form-group">
                                        <label htmlFor="admin">Admin</label>
                                        <Field placeholder={sessionStorage.getItem('user')} style={{width: "500px"}} readOnly={true} name="admin" type="text" className={'form-control'} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <Field style={{width: "500px"}}  name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                        <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <Field style={{width: "500px"}} name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                    </div>
            
                                    <div className="form-group">
                                        <label htmlFor="totalVacancy">Max Vacancy</label>
                                        <Field style={{width: "500px"}} name="totalVacancy" type="number" className={'form-control' + (errors.totalVacancy && touched.totalVacancy ? ' is-invalid' : '')} />
                                        <ErrorMessage name="totalVacancy" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="location">Location</label>
                                        <Field style={{width: "500px"}} id="location" placeholder="Enter a location" runat="server" name="location" type="text" className={'form-control' + (errors.location && touched.location ? ' is-invalid' : '')} />
                                        <ErrorMessage name="location" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="date">Date<span>&nbsp;</span></label>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} > 
                                                            <KeyboardDatePicker style={{width: "140px"}}
                                                                variant="outlined"
                                                                value={date}
                                                                onChange={this.handletDateChange}
                                                                format="dd-MM-yyyy hh:mm:ss"
                                                                minDate={new Date()}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                        <ErrorMessage name="date" component="div" className="invalid-feedback" />
                                    </div>
                                    
                                    <div className="form-group">
                                        <Field style={{width: "500px",display:"none"}} id="Lat" name="lat" type="text" />
                                    </div>

                                    <div className="form-group">
                                        <Field style={{width: "500px",display:"none"}} id="Long" name="long" type="text" />
                                    </div>
                                    
                                    <div className="form-group">
                                        <button onClick={this.props.history.goBack} className="btn btn-primary mr-2">Back</button>
                                        {sessionStorage.getItem('isAdmin')==='true'?
                                            <button type="submit" className="btn btn-success">Create</button>
                                            // <button onClick={event => this.create(event, values)} className="btn btn-success">Create</button>
                                            :null
                                        }
                                    </div>

                        
{/* 
                                </div> */}
                        </Form>
                    </div>
                    
                )}
            />
        )
    }
}

export default NewMeetupComponent