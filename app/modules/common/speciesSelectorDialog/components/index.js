import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Modal from 'react-bootstrap/lib/Modal';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import Button from 'react-bootstrap/lib/Button';
import RaisingButton from '../../raisingButton';
import Types from './types';

import Liner from '../../svgs/liner';

const styles = {
  modalBody: {
    maxHeight: 'calc(100vh - 182px)',
    overflow: 'hidden',
  },
  dates: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 308px)',
  },
  width500: {
    width: 500,
    maxWidth: '100%',
    margin: '0 auto 0 auto',
  },
  catalogTypes: {
    display: 'flex',
    justifyContent: 'center',
  },
};

class locationSelectorDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    sheet: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      fetchCatalogs: PropTypes.func.isRequired,
    }).isRequired,
    fetchCatalogsState: PropTypes.object.isRequired,
    catalogs: PropTypes.array.isRequired,
    catalogTypes: PropTypes.array.isRequired,
    catalogType: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.actions.fetchCatalogs({});
  }
  submit = () => {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit();
    }
    this.props.close();
  }
  renderCurrent = () => {
    const { fetchCatalogsState, sheet: { classes } } = this.props;
    if (fetchCatalogsState.pending) {
      return <div className="text-info">正在读取分类</div>;
    } else if (fetchCatalogsState.fulfilled) {
      const { catalogType, catalogTypes } = this.props;
      return (
        <Types classes={classes} catalogTypes={catalogTypes} catalogType={catalogType} onButtonClick={() => { console.log(1); }} />
      );
    }
    return null;
  }
  renderHeader = () => {
    const { catalogType } = this.props;
    if (!catalogType) {
      return null;
    }
    return (
      <Breadcrumb>
        {
          catalogType && (<Breadcrumb.Item
            active
            onClick={(e) => {
              e.preventDefault();
            }
            }
          >
            {11}
          </Breadcrumb.Item>)
        }
      </Breadcrumb>
    );
  }
  renderSearchResult = () => null
  render() {
    const { close, sheet: { classes } } = this.props;
    return (
      <Modal show backdrop={false} onHide={close}>
        <Modal.Body className={classes.modalBody}>
          {this.renderCurrent()}
          {this.renderHeader()}
          <div className={classes.dates}>
            <div>
              {this.renderSearchResult()}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>取消</Button>
          <Button disabled={null} onClick={this.submit}>确定</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default injectSheet(styles)(locationSelectorDialog);
