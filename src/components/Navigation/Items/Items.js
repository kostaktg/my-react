import React from 'react';
import classes from './Items.module.css'
import Item from './Item/Item'

const items = () => (
    <ul className={classes.NavigationItems}>
        <Item link="/" active> Burger Builder </Item>   
        <Item link="/"> Checkout </Item>
    </ul>
);

export default items;