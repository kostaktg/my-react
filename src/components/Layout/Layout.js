import React  from 'react';

import Aux from  '../../hoc/AuxMy';
import classes from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div>
            Tolbar, SiteDrawer, Backdrop
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;