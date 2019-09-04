import React from 'react'
import { Link } from "react-router-dom";

export default class LogIn extends React.Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }

    onChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return (
            <article className="login">
                <div className="login__background-top"></div>
                <div className="login__background-bottom"></div>
    
                <div className="login__content main-content">
                    <section className="login__section">
    
                        <div className="login__section__title">
                            <h1>sprout</h1>
                        </div>
    
                        <section className="login__section__entry">
                            <form>
                                <input className="login__section__entry__input" name="email" placeholder="email" onChange={this.onChange}></input>
                                <input className="login__section__entry__input" name="password" placeholder="password" onChange={this.onChange}></input>
                            </form>
    
                            {/* <div className="login__section__sign-in"><Link to="/user/garden"><span>Sign In</span></Link></div> */}
                            <div className="login__section__sign-in" onClick={()=>this.props.handleLogin(this.state.email, this.state.password)}><span>Sign In</span></div>
                            <div className="login__section__create-account"><Link to="/signup"><span>Create an account</span></Link></div>
                        </section>
                    </section>
                </div>
            </article>
        )
    }

}
