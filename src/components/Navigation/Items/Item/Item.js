import React from 'react';
import classes from './Item.module.css'

const item = (props) => (
    <li  className={classes.NavigationItem}>
        <a
         href={props.link}
         className={props.active ? classes.active: null}
         >{props.children}</a>
    </li>
);

export default item;