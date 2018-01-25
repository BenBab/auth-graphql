import React, { Component } from 'react'
import AuthForm from './AuthForm'
import loginMutation from '../mutations/login';
import { graphql } from 'react-apollo'
import query from '../queries/CurrentUser';
import { hashHistory } from "react-router";


class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = { errors: [] }
        
    }

    componentWillUpdate(nextProps) {
       // this.props >> //the old, current set of props
       // nextProps >>// the next set of props that will be in place when the component re renders

        //console.log(this.props, nextProps)
        if ( !this.props.data.user && nextProps.data.user){
            // from the console log you can see the the first set of data props with loading true and user is null
            // then the next set of props loading is false and user is populated 
            // the if statement says if the initial user props is null and the nextprops is populated then do something
            // we then make it redirect to the dashboard
            hashHistory.push('/dashboard');
        }
    }


    onSubmit({ email, password }){
        this.props.mutate({
            variables: {email, password },
            refetchQueries: [{ query }]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });
    }
    
    
    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm authenticationProps={this.onSubmit.bind(this)} errors={this.state.errors} />
            </div>
        )
    }
}

export default graphql(query)(
  graphql(loginMutation)(LoginForm)
);