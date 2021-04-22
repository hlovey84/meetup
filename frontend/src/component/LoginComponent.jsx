import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MeetupDataService from '../service/MeetupDataService';


class NewMeetupComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
            isError: false
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    user: '',
                    password: ''
                }}
                
                validationSchema={
                    Yup.object().shape({
                    user: Yup.string().required('No user provided.'),
                    password: Yup.string().required('No password provided.')
                    })
                }

                onSubmit={async  fields => {
                   await MeetupDataService.login(JSON.stringify(fields, null, 4))
                    .then(
                        response => {
                            console.log(response);
                            if(!!response.data.id){
                                let isAdmin = (response.data.rol === 'Administrator') ? true : false;
                                sessionStorage.setItem('isAdmin', isAdmin);
                                sessionStorage.setItem('userId', response.data.id);        
                                sessionStorage.setItem('user', response.data.username);
                                sessionStorage.setItem('password', response.data.password);
                                this.props.history.push(`/happybeermeetups`);
                                this.setState({
                                    isError: false,
                                })
                            }else{
                                this.setState({
                                    isError: true,
                                    errorMessage: response.data.error
                                })
                            }   
                        }
                    ).catch(error => {
                        console.log("error:");
                        console.log(error);
                    });
                }}

                render={({ errors, status, touched }) => (

                    
                    <Form>
                        <h3 style={{color: "orange"}}>Login</h3>
                        <div className="form-group">
                            <label htmlFor="user">User</label>
                            <Field name="user" type="text" style={{width: "250px"}}
                                className={'form-control' + (errors.user && touched.user ? ' is-invalid' : '')} />
                            <ErrorMessage name="user" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" style={{width: "250px"}}
                                className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>


                    <div className="form-group">
                        <button type="submit" className="btn btn-success">Login</button>
                    </div>

                    {
                        this.state.isError ? 
                        <div name="invalid_user" style={{color: "red"}}> {this.state.errorMessage} </div>
                        : null
                    }
                    </Form>

                    
                )}
            />
        )
    }
}

export default NewMeetupComponent