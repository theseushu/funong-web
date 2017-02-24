import React, { PropTypes } from 'react';
import { Fields } from 'redux-form';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import moduleStyles from '../moduleStyles';
import CategoryField from './categoryField';
import SpeciesField from './speciesField';
import NameField from './nameField';

const generateName = (category, species) => {
  if (!category || !species) {
    return null;
  }
  return `${category.name} ${species.name}`;
};

const CategorySpeciesName = ({ category, species, name }) => {
  const onCategoryChange = (newCategory) => {
    category.input.onChange(newCategory);
    species.input.onChange(null);
    const generatedName = generateName(newCategory, species.input.value);
    if (generatedName) {
      name.input.onChange(generatedName);
    }
  };
  const onSpeciesChange = (newSpecies) => {
    species.input.onChange(newSpecies);
    const generatedName = generateName(category.input.value, newSpecies);
    if (generatedName) {
      name.input.onChange(generatedName);
    }
  };
  const category2 = {
    ...category,
    input: { ...category.input, onChange: onCategoryChange },
  };
  const species2 = {
    ...species,
    input: { ...species.input, onChange: onSpeciesChange },
  };
  return (
    <div>
      <CategoryField {...category2} />
      <SpeciesField category={category.input.value || null} {...species2} />
      <NameField {...name} />
    </div>
  );
};

CategorySpeciesName.propTypes = {
  category: PropTypes.object.isRequired,
  species: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
};

const CategorySpeciesNameFields = ({ classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      分类，品种和名称
    </CardTitle>
    <CardText>
      <Fields names={['category', 'species', 'name']} component={CategorySpeciesName} />
    </CardText>
  </Card>
);

CategorySpeciesNameFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(CategorySpeciesNameFields);
