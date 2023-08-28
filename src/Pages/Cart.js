import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import CartProductCard from '../components/ProductCart';
import { useCart } from '../components/useContext';

const useStyles = makeStyles((theme) => ({
  totalPriceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  totalPriceText: {
    marginRight: theme.spacing(2),
  },
  divider: {
    borderBottomWidth: 1,
  },
}));

const Cart = () => {
  const styles = useStyles();

  const { cartItems} = useCart();
  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);


  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (<>
        {cartItems.map((item, index) => (
        <CartProductCard product={item} key={index} />
      ))}

      {/* Total Price Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className={styles.totalPriceContainer}>
            <Typography className={styles.totalPriceText}>Total Price:</Typography>
            <Typography className={styles.totalPriceText}>${totalPrice.toFixed(2)}</Typography>
          </div>
          <div className={styles.totalPriceContainer}>
            <Typography className={styles.totalPriceText}>Shipping:</Typography>
            <Typography className={styles.totalPriceText}>$ 0</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Divider className={styles.divider} />
          <div className={styles.totalPriceContainer}>
            <Typography className={styles.totalPriceText}>Grand Total:</Typography>
            <Typography className={styles.totalPriceText}>${totalPrice.toFixed(2)}</Typography>
          </div>
        </Grid>
      </Grid>
      </> )
      }
     

    </div>
  );
};

export default Cart;
