import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { useCart } from './useContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: "100%",
    margin: '20px',
  },
  media: {
    width: '100%',
    height: 100,
    objectFit: 'cover',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  quantityButton: {
    fontSize: '1rem',
  },
}));

const CartProductCard = ({ product }) => {
  const classes = useStyles();
  const { dispatch, setCart } = useCart();
  const [quantity, setQuantity] = useState(product.quantity);

  const removeFromCart = (id) => {
    setCart(true);
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.name}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          Price: ${product.price}
        </Typography>
        <div className={classes.quantityContainer}>
          <IconButton
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className={classes.quantityButton}
          >
            -
          </IconButton>
          <Typography variant="body1">{quantity}</Typography>
          <IconButton
            onClick={incrementQuantity}
            className={classes.quantityButton}
          >
            +
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => removeFromCart(product.id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartProductCard;
