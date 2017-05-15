import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import injectSheet from 'react-jss';
import { breakpoints } from 'modules/common/styles';
import all from './assets/all.jpg';
import apple from './assets/apple.png';
import grape from './assets/grape.png';
import mongo from './assets/mongo.png';
import orange from './assets/orange.png';
import peach from './assets/peach.png';
import strawberry from './assets/strawberry.png';

const categories = [
  {
    image: apple,
    link: '/supplies?category=5859445ddc9477148f492643',
  },
  {
    image: grape,
    link: '/supplies?category=5859445ddc9477148f49267f',
  },
  {
    image: mongo,
    link: '/supplies?category=5859445ddc9477148f49266a',
  },
  {
    image: orange,
    link: '/supplies?category=5859445ddc9477148f492662',
  },
  {
    image: peach,
    link: '/supplies?category=5859445ddc9477148f49264b',
  },
  {
    image: strawberry,
    link: '/supplies?category=5859445ddc9477148f492680',
  },
];

const Category = ({ classes, image, link }) => (
  <Link className={`${classes.category} material-transition`} to={link} style={{ backgroundImage: `url(${image})` }}>
  </Link>
);

Category.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const Categories = ({ classes }) => (
  <div>
    <h4>富农水果季</h4>
    <div className={classes.wrapper}>
      <a href="/supplies" className={classes.all}>1</a>
      <div className={classes.categories}>
        {
          categories.map((c, i) => <Category key={i} classes={classes} {...c} />)
        }
      </div>
    </div>
  </div>
);

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  wrapper: {
    display: 'flex',
    width: '100%',
    height: 300,
  },
  all: {
    width: 300,
    background: `url(${all})`,
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  categories: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  category: {
    width: '33.3%',
    display: 'inline-block',
    height: 150,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
  },
})(Categories);
