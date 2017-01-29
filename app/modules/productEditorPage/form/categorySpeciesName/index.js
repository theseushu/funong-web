import React, { PropTypes } from 'react';
import CategoryField from './categoryField';
import SpeciesField from './speciesField';
import NameField from './nameField';

const generateName = (category, species) => {
  if (!category || !species) {
    return null;
  }
  return `${category.name} ${species.name}`;
};

const CategorySpeciesName = ({ category, species, name, sheet }) => {
  const onCategoryChange = (newCategory) => {
    category.input.onChange(newCategory);
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
      <CategoryField {...category2} sheet={sheet} />
      <SpeciesField {...species2} />
      <NameField {...name} />
    </div>
  );
};

CategorySpeciesName.propTypes = {
  category: PropTypes.object.isRequired,
  species: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default CategorySpeciesName;
