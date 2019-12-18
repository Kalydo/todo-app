import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthencationService from './AuthencationService.js';

class AuthenticatedRoute extends Component{
    render (){
        if (AuthencationService.isUserLoggedIn){
            return <Route {...this.props}/>
        }else{
            return <Redirect to="/login"/>
        }
    }
}

export default AuthenticatedRoute