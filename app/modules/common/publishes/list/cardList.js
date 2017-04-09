import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { breakpoints } from 'modules/common/styles';
import * as cards from '../cards';

const List = ({ type, entries, classes, brief, column, actions }) => {
  const Card = brief ? cards[type].briefCard : cards[type].card;
  let cellClassName = classes.column4;
  if (column === 3) {
    cellClassName = classes.column3;
  } else if (column === 1) {
    cellClassName = classes.column1;
  }
  return (
    <div className={classes.entries}>
      {
        entries.map((entry, i) => (
          <div key={i} className={cellClassName}>
            <Card
              key={i}
              publish={entry}
              actions={actions}
            />
          </div>
        ))
      }
    </div>
  );
};

List.propTypes = {
  brief: PropTypes.bool,
  column: PropTypes.oneOf([
    1, 3, 4,
  ]),
  type: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.array,
};

export default injectSheet({
  entries: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  column4: {
    width: '25%',
    boxSizing: 'border-box',
    padding: '0 8px 16px',
    [breakpoints.mediaSmallScreen]: {
      width: '33.33%',
    },
    [breakpoints.mediaDestkopBelow]: {
      width: '33.33%',
    },
    '@media (max-width: 680px)': {
      width: '50%',
    },
    [breakpoints.mediaTabletBelow]: {
      width: '100%',
    },
  },
  column3: {
    width: '33.3%',
    boxSizing: 'border-box',
    padding: '0 8px 16px',
    [breakpoints.mediaSmallScreen]: {
      width: '50%',
    },
    [breakpoints.mediaDestkopBelow]: {
      width: '50%',
    },
    '@media (max-width: 680px)': {
      width: '100%',
    },
  },
  column1: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 8px 16px',
  },
})(List);
