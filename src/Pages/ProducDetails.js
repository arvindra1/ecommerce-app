import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  makeStyles,
  Grid,
  Avatar,
  Toolbar,
  AppBar,
  Badge
} from '@material-ui/core';
import { useCart } from '../components/useContext';
import { RiShoppingCart2Fill } from 'react-icons/ri'; // Replace with the cart icon you prefer


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  appBar: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
},
toolbar: {
    justifyContent: 'space-between',
},
avatar: {
    cursor: 'pointer',
},
content: {
    flexGrow: 1,
    padding: theme.spacing(2),
},
  paper: {
    padding: theme.spacing(3),
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  
}));

const ProductDetails = ({ product }) => {
  const classes = useStyles();
  const { id } = useParams();
  const products = product.find((item) => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const {dispatch,cartItems}=useCart();

  const addToCart = () => {
    const itemWithQuantity = {
      ...products,
      quantity: quantity,
    };
    dispatch({ type: 'ADD_TO_CART', item: itemWithQuantity });
    // Dispatch action to add item to cart
    console.log('Adding to cart:', itemWithQuantity);
  };

  const isItemInCart = cartItems.some((item) => item.id === products.id);

  const removeFromCart = () => {
    
    dispatch({ type: 'REMOVE_FROM_CART', id: products.id });
  };

  return (
    <div>
     <AppBar position="static" className={classes.appBar}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6">E-Commerce</Typography>
                        <Avatar
                            className={classes.avatar}
                            alt="User"
                            src="user-avatar.jpg"
                            onClick={()=>console.log('drawer')}
                        />
                     <Link to='/cart'> <Badge
              badgeContent={cartItems.length}
              color="secondary"
              showZero
            >
              <RiShoppingCart2Fill
                size={30}
                style={{ color: 'white' }}
              />
            </Badge></Link>
                    </Toolbar>
                </Container>
            </AppBar>
    <Container className={classes.container}>
   
      <Paper elevation={3} className={classes.paper}>
        {products ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src={products.image}
                alt={products.title}
                className={classes.image}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {products.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Description:
              </Typography>
              <Typography variant="body1">{products.description}</Typography>
              <Typography variant="h6" gutterBottom>
                Price: ${products.price}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Quantity:
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </Button>
              <span style={{ margin: '0 8px' }}>{quantity}</span>
              <Button
                variant="outlined"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
              {isItemInCart ? (
          <Button
            onClick={()=>removeFromCart(products.id)}
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
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6">Product not found</Typography>
        )}
      </Paper>
    </Container>
    </div>
  );
};

export default ProductDetails;
