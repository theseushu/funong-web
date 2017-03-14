import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import injectSheet from 'react-jss';
import Liner from 'modules/common/svgs/liner';

function renderButton(result, i, onClick) {
  return <Button key={i} onClick={(e) => { e.preventDefault(); onClick(result); }}>{result.name}</Button>;
}

function renderButtonWithActiveCheck(result, i, isButtonActive, onClick) {
  const active = isButtonActive(result);
  return (
    <Button
      key={i}
      colored={active}
      onClick={(e) => { e.preventDefault(); onClick(result); }}
    >{result.name}</Button>
  );
}

const Results = ({ pending, fulfilled, rejected, error, result, onClick, isButtonActive, sheet: { classes } }) => {
  if (pending) {
    return <Liner />;
  } else if (rejected) {
    return (
      <div className="text-center">
        <span className="text-danger">读取列表失败, 请重试{error && error.toString()}</span>
      </div>
    );
  } else if (fulfilled) {
    return (
      <div className={classes.results}>
        {
          isButtonActive ? result.map((r, i) => renderButtonWithActiveCheck(r, i, isButtonActive, onClick))
            : result.map((r, i) => renderButton(r, i, onClick))
        }
      </div>
    );
  }
  return null;
};

Results.propTypes = {
  sheet: PropTypes.object,
  pending: PropTypes.bool,
  fulfilled: PropTypes.bool,
  rejected: PropTypes.bool,
  error: PropTypes.object,
  result: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    adcode: PropTypes.string.isRequired,
  })),
  onClick: PropTypes.func.isRequired,
  isButtonActive: PropTypes.func,
};

export default injectSheet({
  results: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})(Results);
