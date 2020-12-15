import classes from './ingredient.css';

const ingredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case ('bread-bottom') :
            ingradient = <div className={classes.bottom}></div>;
            break;
        case ('bread-top') :
            ingradient  = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div> 
                    <div className={classes.Seeds2}></div> 
                </div>
            );
            break;
        case ('meet') :
            ingredient = <div className={classes.Meet}></div>
            break;
        case ('cheese') :
            ingredient = <div className={classes.Cheese}></div>
            break;
        case ('bacon') :
            ingredient = <div className={classes.Bacon}></div>
            break;
        case ('salad') :
            ingredient = <div className={classes.Salad}></div>
        break;
    }
    return ingredient;
};

export default ingredient;