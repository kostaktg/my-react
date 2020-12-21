import React, { Component } from 'react';

import Aux from '../../hoc/AuxMy/AuxMy';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/UI/Spinner/Spinner';
import whitErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGRIDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}

class Builder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {});
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map( ingKey => {
            return ingredients[ingKey]
        }). reduce( (sum, el) => {
            return sum + el;
        } , 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCout = oldCount + 1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCout;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCout = oldCount - 1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCout;
        const priceDeduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueSlHandler = () => {
        // alert('You continue');
        // const order = {
        //     igredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'TestName',
        //         address: {
        //             street: 'Street Test 1',
        //             zipCode: '1000',
        //             country: 'USA'
        //         },
        //         email: 'test@abv.bg'
        //     }
        // }
        // axios.post('orders.json', order)
        // .then (response => {
        //     this.setState({ loading: true, purchasing: false });
        // })
        // .catch (error => {
        //     this.setState({ loading: false, purchasing: false });
        // }); 
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;



  
        let burger  = <Loader />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    ingrediendAdded={this.addIngredientHandler} 
                    ingrediendRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueSlHandler}
                price={this.state.totalPrice}
                ingredients={this.state.ingredients} />;
        }
        if (this.state.loading) {
            orderSummary = <Loader />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default whitErrorHandler(Builder, axios);