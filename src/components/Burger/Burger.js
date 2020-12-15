import classes from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';
import React from 'react';

const burger = (props) => {



    let ingredients = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <Ingredient key={ingKey+i} type={ingKey} />;
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (ingredients.length === 0) {
        ingredients = <p> Please start adding ingredients !</p>;
    }

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
                {ingredients}
            <Ingredient type="bread-bottom" />

        </div>
    );
}

export default burger;