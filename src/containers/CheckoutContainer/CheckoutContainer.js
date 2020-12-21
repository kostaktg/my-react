import React, { Component } from  'react';
import { Route } from 'react-router-dom';

import Checkout from '../../components/Order/Checkout/Checkout';
import ContactData from './ContactData/ContactData';


class CheckoutContainer extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let [name, quantity] of query.entries(query)) {
            ingredients[name] = Number(quantity);
        }
        console.log(this.state);

        this.setState({ingredients: ingredients});

    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    checoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <Checkout 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                />

                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

export default CheckoutContainer;