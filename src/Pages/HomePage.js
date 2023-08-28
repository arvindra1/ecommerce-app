import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    TextField,
    Button,
    Avatar,
    makeStyles,
    Badge
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { RiShoppingCart2Fill } from 'react-icons/ri'; // Replace with the cart icon you prefer
import { useCart } from '../components/useContext';


const useStyles = makeStyles((theme) => ({

    root: {
        paddingTop: theme.spacing(4),
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
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    searchInput: {
        flex: 1,
        marginRight: theme.spacing(2),
    },
    filtersContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
    },
    filterButton: {
        flex: 1,
        marginRight: theme.spacing(1),
    },
}));


function HomePage() {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [product, setProducts] = useState([]);
    const {cartItems}=useCart();
   


    const handleSearch = () => {
        console.log('handleSearch');
        const filtered = product.filter(
            (product) =>
                product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                product.description.toLowerCase().includes(searchInput.toLowerCase())
        );
        setProducts(filtered);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };


    const handleFilterJewellary = () => {
        fetch('https://fakestoreapi.com/products/category/jewelery')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setProducts(json);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }
    const handleFiltermen = () => {
        fetch('https://fakestoreapi.com/products/category/men')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setProducts(json);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    const handleFilterWomen= () => {
        fetch('https://fakestoreapi.com/products/category/women')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setProducts(json);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }
    useEffect(() => {
        // Fetch data when the component mounts
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data); // Check the structure of the data
                // Update the state with fetched data
                console.log("New Data", product);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });




    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6">E-Commerce</Typography>
                        <Avatar
                            className={classes.avatar}
                            alt="User"
                            src="user-avatar.jpg"
                            onClick={handleDrawerToggle}
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
            <Container className={classes.content}>
                <div className={classes.searchContainer}>
                    <TextField
                        className={classes.searchInput}
                        variant="outlined"
                        placeholder="Search for products..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
                <div className={classes.filtersContainer}>
                    <Button
                        className={classes.filterButton}
                        variant="outlined"
                        onClick={handleFilterJewellary}

                    >
                        Jewellary
                    </Button>
                    <Button
                        className={classes.filterButton}
                        variant="outlined"
                        onClick={handleFilterWomen}

                    >
                        women's clothing
                    </Button>
                    <Button
                        className={classes.filterButton}
                        variant="outlined"
                        onClick={handleFiltermen}

                    >
                        men's clothing

                    </Button>
                </div>
                <Grid container spacing={3}>
                    {product.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard product={product} key={product.id} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default HomePage;
