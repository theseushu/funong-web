import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import Page from './page';
import Ellipsis from './ellipsis';
import First from './first';
import Last from './last';
import Previous from './previous';
import Next from './next';

const buttonClick = (e, number, onChange) => {
  e.preventDefault();
  if (typeof onChange === 'function') {
    onChange(number);
  }
};
const Pagination = ({ current, total, sibling, boundary, onChange, classes }) => {
  const buttons = [];
  if (total === 1) {
    return null;
  } else if (total < (sibling + boundary) * 2) {
    for (let i = 1; i <= total; i += 1) {
      buttons.push(<Page
        style={i === current ? { color: colors.colorAccent } : undefined}
        disabled={i === current}
        key={buttons.length}
        onClick={(e) => buttonClick(e, i, onChange)}
      >{i}</Page>);
    }
  } else {
    buttons.push(<First key={0} disabled={current === 1} onClick={(e) => buttonClick(e, 1, onChange)} />);
    buttons.push(<Previous key={1} disabled={current === 1} onClick={(e) => buttonClick(e, current - 1, onChange)} />);
    if (current <= sibling + boundary + 1) {
      for (let i = 0; i < current; i += 1) {
        buttons.push(<Page key={buttons.length} onClick={(e) => buttonClick(e, i, onChange)}>{i}</Page>);
      }
    } else {
      for (let i = 1; i <= boundary; i += 1) {
        buttons.push(<Page key={buttons.length} onClick={(e) => buttonClick(e, i, onChange)}>{i}</Page>);
      }
      buttons.push(<Ellipsis key={buttons.length} />);
      for (let i = sibling; i > 0; i -= 1) {
        buttons.push(<Page
          key={buttons.length}
          onClick={(e) => buttonClick(e, current - i, onChange)}
        >{current - i}</Page>);
      }
    }

    buttons.push(<Page key={buttons.length} style={{ color: colors.colorAccent }} disabled>{current}</Page>);

    if (current + sibling + boundary >= total) {
      for (let i = 1; i <= total - current; i += 1) {
        buttons.push(<Page
          key={buttons.length}
          onClick={(e) => buttonClick(e, current + i, onChange)}
        >{current + i}</Page>);
      }
    } else {
      for (let i = 1; i <= sibling; i += 1) {
        buttons.push(<Page
          key={buttons.length}
          onClick={(e) => buttonClick(e, current + i, onChange)}
        >{current + i}</Page>);
      }
      buttons.push(<Ellipsis key={buttons.length} />);
      for (let i = boundary - 1; i >= 0; i -= 1) {
        buttons.push(<Page
          key={buttons.length}
          onClick={(e) => buttonClick(e, total - i, onChange)}
        >{total - i}</Page>);
      }
    }
    buttons.push(<Next
      key={buttons.length} disabled={current === total}
      onClick={(e) => buttonClick(e, current + 1, onChange)}
    />);
    buttons.push(<Last
      key={buttons.length} disabled={current === total}
      onClick={(e) => buttonClick(e, total, onChange)}
    />);
  }
  return (
    <div className={classes.pagination}>
      {buttons}
    </div>
  );
};

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  sibling: PropTypes.number.isRequired,
  boundary: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  pagination: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    '& > button': {
      color: colors.colorSubTitle,
      padding: 0,
      minWidth: 36,
    },
    '& > span': {
      width: 36, textAlign: 'center', height: 36, lineHeight: '36px',
    },
  },
})(Pagination);
