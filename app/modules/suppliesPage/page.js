import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Layout from '../common/layout';
import Card from '../common/product/card';

const SuppliesPage = ({ user, products }) => ( // eslint-disable-line no-unused-vars
  <Layout
    content={(
      <Grid>
        <Cell col={10} tablet={6} phone={4}>
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {
              products.map((product, i) => (
                <div key={i} style={{ width: 200 }}>
                  <Card key={i} product={product} />
                </div>
              ))
            }
          </div>
        </Cell>
        <Cell col={2} tablet={2} hidePhone>

        </Cell>
      </Grid>
    )}
  >
  </Layout>
);

SuppliesPage.propTypes = {
  products: PropTypes.array.isRequired,
  user: PropTypes.object,
};

export default SuppliesPage;
