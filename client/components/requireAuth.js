import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import currentUserQuery from '../queries/CurrentUser';
import { hashHistory } from "react-router";


export default (WrappedComponent) => {
class requireAuth extends Component {
    componentWillUpdate(nextProps){
        console.log(this.props.data.user, this.props.data.loading)
        if (!nextProps.data.user && !nextProps.data.loading){
            hashHistory.push('/login');
        }
    }
    
    render(){
        return <WrappedComponent WrappedComponent{...this.props}/>;
    }
}

return graphql (currentUserQuery)(requireAuth);
};