import React, { PureComponent, PropTypes } from 'react';

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import Button from 'react-bootstrap/lib/Button';

class PriceDefinitionDropdownButton extends PureComponent {
  static propTypes = {
    fetchPriceDefinitions: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    fulfilled: PropTypes.bool,
    rejected: PropTypes.bool,
    error: PropTypes.object,
    priceDefinitions: PropTypes.array,
    priceDefinition: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.fetchPriceDefinitions({});
  }
  render() {
    const { pending, fulfilled, rejected, error, priceDefinitions, priceDefinition, onSelect } = this.props;
    if (pending) {
      return <Button>正在读取</Button>;
    } else if (rejected) {
      const errorMessage = (error && (error.message || error.toString())) || '';
      return <Button onClick={() => this.props.fetchPriceDefinitions({})}>{`读取失败，点击重试: ${errorMessage}`}</Button>;
    } else if (fulfilled) {
      const selected = priceDefinition || priceDefinitions[0];
      return (
        <div>
          <div>
            <ButtonToolbar>
              <Dropdown id="_dropdown-price-definition-selection">
                <Dropdown.Toggle>
                  {selected.desc}
                </Dropdown.Toggle>
                <Dropdown.Menu className="super-colors">
                  {
                    priceDefinitions.map((pd, i) => (
                      <MenuItem
                        key={i}
                        active={selected.objectId === pd.objectId}
                        eventKey={i}
                        onSelect={() => onSelect(pd)}
                      >{pd.desc}</MenuItem>)
                    )
                  }
                </Dropdown.Menu>
              </Dropdown>
            </ButtonToolbar>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default PriceDefinitionDropdownButton;
