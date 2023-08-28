import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useCart } from './useContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: '20px',
  },
  media: {
    height: 200,
  },
}));

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const maxDescriptionLength = 40;
  const { cartItems, dispatch } = useCart();

  const isItemInCart = cartItems.some((item) => item.id === product.id);

  const addToCart = () => {
    const itemWithSizeAndRang = {
      ...product,
    };
    dispatch({ type: 'ADD_TO_CART', item: itemWithSizeAndRang });
  };

  const removeFromCart = () => {
    
    dispatch({ type: 'REMOVE_FROM_CART', id: product.id });
  };

  return (
    <Card className={classes.root}>
 
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.name}
      />
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
      <CardContent>
        <Typography variant="h6" component="h2">
          {product.title.length > 15
            ? product.title.slice(0, 15) + '...'
            : product.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description.length > maxDescriptionLength
            ? product.description.slice(0, maxDescriptionLength) + '...'
            : product.description}
        </Typography>
        <Typography variant="h6" color="primary" component="p">
          ${product.price}
        </Typography>
      </CardContent>
      </Link>
      <CardActions>
        {isItemInCart ? (
          <Button
            onClick={removeFromCart}
            style={{ backgroundColor: 'red', color: 'white' }}
            size="small"
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            onClick={addToCart}
            style={{ backgroundColor: 'blue', color: 'white' }}
            size="small"
          >
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
