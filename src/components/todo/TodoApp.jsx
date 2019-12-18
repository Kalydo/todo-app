import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AuthencationService from './AuthencationService.js'
import AuthenticatedRoute from './AuthenticatedRoute.jsx' 
import HelloWorldService from '../../HelloWorldService.js'

class TodoApp extends Component{
    render(){
        return(
            <div className="TodoApp">
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/> 
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                        <Route component={ErrorComponent}/>  
                    </Switch>
                    <FooterComponent/>
                </Router>
            </div>
            
        )
    }
}

class ListTodosComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            todo : [
                {id: 1, description : 'Learn React', done:false, targetDate: new Date()},
                {id: 2, description : 'will be the best', done:false, targetDate: new Date()},
                {id: 3, description : 'become a expert', done:false, targetDate: new Date()},
                {id: 4, description : 'get strong enough', done:false, targetDate: new Date()}
                ] 
        }

    }
    render(){
        return (<div>
        <h1>List Todos</h1>
        <div className="container">
            <table className="table">
                <thead>
                    <tr>  
                        <th>description</th>
                        <th>is Completed?</th>
                        <th>Target Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.state.todo.map(
                        todo =>
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate.toString()}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        </div>
        )
    }
}

class HeaderComponent extends Component {
    render( ){
        const isUserLoggedIn = AuthencationService.isUserLoggedIn();
        console.log(isUserLoggedIn);
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>Kalydo Corp.</div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li className="nav-link"><Link to="/welcome/:name">Home</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li className="nav-link"><Link to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/" onClick={AuthencationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render(){
        return(
            <footer className="footer">
                <div>Kalydo Corp.</div>
            </footer>
        )
    }
}

class  WelcomeComponent extends Component
{
    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage : ""
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    }
render(){
    return(
        <>
            <div className="container">
                Welcome {this.props.match.params.name}. you can manage your todos 
                <Link to="/todos">here</Link>
            </div>
            <div className="container">
                Click here to get a customized welcome message.
                <button onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
            </div>
            <div>
                <div className="container">{this.state.welcomeMessage}</div>
            </div>
        </>
    ) 
}
retrieveWelcomeMessage(){
    console.log('retrieve clicked');
    HelloWorldService.executeHelloWorldBeanService()
    .then(response => this.handleSuccessfulResponse(response))
    HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
    .then(response => this.handleSuccessfulResponse(response))
}

handleSuccessfulResponse(response){
    this.setState({welcomeMessage : response.data.message})
}

}


function ErrorComponent ()
{
    return <div>das ist keine seite die du besuchen solltest</div>
}


class LoginComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
             username: 'manuel',
             password: 'samichlaus31',
             hasLoginFaild: false,
             showSuccessMessage: false
        }
        
    }

    handlerChange = (event) => {
        console.log(this.state)
        this.setState({[event.target.name]: event.target.value})
    }

    loginClicked = () => {
        if(this.state.username=== 'manuel' && this.state.password=== 'samichlaus31'){
            AuthencationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
        }else{
            this.setState({hasLoginFaild:true})
        }
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
            <div className="container">
                {this.state.hasLoginFaild && <div className="alert alert-warning">Invalid Credentials</div>}
                Username: <input type="text" name="username" value={this.state.username} onChange={this.handlerChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handlerChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        </div>
        )
    }
}

export default TodoApp