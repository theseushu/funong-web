import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Liner from '../../svgs/liner';

function renderButton(result, i, onClick) {
  return <Button key={i} onClick={() => onClick(result)}>{result.name}</Button>;
}

function renderButtonWithActiveCheck(result, i, isButtonActive, onClick) {
  const active = isButtonActive(result);
  return (
    <Button
      key={i}
      disabled={active}
      bsStyle={active ? 'info' : 'default'}
      onClick={() => onClick(result)}
    >{result.name}</Button>
  );
}

const Results = ({ pending, fulfilled, rejected, error, results, onClick, isButtonActive }) => {
  if (pending) {
    return <Liner />;
  } else if (rejected) {
    return (<div className="text-center">
      <span className="text-danger">读取列表失败, 请重试{error && error.toString()}</span>
    </div>);
  } else if (fulfilled) {
    return (
      <div>
        {
          isButtonActive ? results.map((result, i) => renderButtonWithActiveCheck(result, i, isButtonActive, onClick))
            : results.map((result, i) => renderButton(result, i, onClick))
        }
      </div>
    );
  }
  return null;
};

Results.propTypes = {
  pending: PropTypes.bool,
  fulfilled: PropTypes.bool,
  rejected: PropTypes.bool,
  error: PropTypes.object,
  results: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
  })),
  onClick: PropTypes.func.isRequired,
  isButtonActive: PropTypes.func,
};

export default Results;
