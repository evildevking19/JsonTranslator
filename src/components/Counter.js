
import {useState} from 'react';
import {createStyles, makeStyles} from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(() => {
    return createStyles({
        counter: {
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        button: {
            fontSize: '20px!important',
            height: '36px!important',
            color: '#666!important',
        }
    });
});

const Counter = (props) => {
    const {counter, button} = useStyles();
    const increaseAmount = () => {
        props.setAmount(props.amount+1);
    }
    const decreaseAmount = () => {
        if (props.amount === 1) return;
        props.setAmount(props.amount-1);
    }
    return (
        <div className={counter + " " + props.className}>
            <Button className={button} onClick={() => decreaseAmount()}>-</Button>
            <span>{props.amount}</span>
            <Button className={button} onClick={() => increaseAmount()}>+</Button>
        </div>
    )
}
export default Counter;