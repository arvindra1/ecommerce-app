import React from 'react'

function Home() {
  return (
    <div>
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
    </div>
  )
}

export default Home
