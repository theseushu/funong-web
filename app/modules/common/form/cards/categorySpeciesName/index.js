import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import moduleStyles from '../../moduleStyles';
import CategoryField from './categoryField';
import SpeciesField from './speciesField';
import NameField from './nameField';

const CategorySpeciesNameFields = ({ form, catalogs, classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      分类，品种和名称
    </CardTitle>
    <CardText>
      <CategoryField catalogs={catalogs} form={form} />
      <SpeciesField form={form} />
      <NameField form={form} />
    </CardText>
  </Card>
);

CategorySpeciesNameFields.propTypes = {
  form: PropTypes.string.isRequired,
  catalogs: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(CategorySpeciesNameFields);
