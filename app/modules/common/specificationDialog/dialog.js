import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import _findIndex from 'lodash/findIndex';
import Textfield from 'react-mdl/lib/Textfield';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import DataTable, { TableHeader } from 'react-mdl/lib/DataTable';
import { Chip } from 'react-mdl/lib/Chip';
import Dialog from '../dialog';
import styles from '../styles';
import { layout } from './styles';

const SpecificationEditorDialog = ({
  isDefault,
  title,
  close,
  onSubmit,
  sheet: { classes },
  specification: { name, params, prices },
  newParam,
  onSpecNameChanged,
  onNewParamChanged,
  addSpecParam,
  removeSpecParam,
  editPrice,
  removePrice,
}) => (
  <Dialog
    show
    onHide={close}
    onCancel={close}
    title={title}
    fixedHeight
    scrollableContent={
      <div>
        {
          isDefault ?
            <div className={classes.title}>默认规格</div> :
            <div className={classes.line}>
              <Textfield
                label="名称"
                name="_specName"
                floatingLabel
                required
                onChange={onSpecNameChanged}
                value={name}
              />
            </div>
        }
        <div className={classes.params}>
          {params.length === 0 && <span className={styles.colorError}><small>尚无任何参数</small></span>}
          {params.map((param, i) => (<Chip key={i} onClose={() => removeSpecParam(param)}>{param}</Chip>))}
        </div>
        <div className={classes.line}>
          <Textfield
            label="添加新规格参数"
            name="_specParameter"
            floatingLabel
            onChange={onNewParamChanged}
            value={newParam}
            required={params.length === 0}
          />
          <Button
            colored
            onClick={addSpecParam}
            disabled={newParam.trim() === '' || params.indexOf(newParam.trim()) >= 0}
          >
            {params.indexOf(newParam.trim()) >= 0 ? '重复' : '添加'}
          </Button>
        </div>
        <div className={classes.title}>
          <span>价格</span>
        </div>
        <div className={classes.line}>
          <DataTable
            rowKeyColumn="index"
            shadow={0}
            rows={prices.map(({ value, unit, minCount }, i) => ({
              value: `${value} / ${unit}`,
              minCount,
              operations: (
                <div className={classes.tableButtons}>
                  <div className={classes.tableInlineButton}>
                    <IconButton
                      colored name="edit_circle" onClick={(e) => {
                        e.preventDefault();
                        editPrice(i);
                      }}
                    />
                  </div>
                  <div className={classes.tableInlineButton}>
                    <IconButton
                      colored name="delete_sweep" onClick={(e) => {
                        e.preventDefault();
                        removePrice(i);
                      }}
                    />
                  </div>
                </div>
              ),
            }))}
          >
            <TableHeader name="value" tooltip="价格，人民币，单位元">价格￥（元）</TableHeader>
            <TableHeader numeric name="minCount" tooltip="采购数量不同时，价格不同">最小采购数量</TableHeader>
            <TableHeader numeric name="operations">
              <div className={classes.tableInlineButton}>
                <IconButton
                  colored name="add_circle" onClick={(e) => {
                    e.preventDefault();
                    editPrice(-1);
                  }}
                />
              </div>
            </TableHeader>
          </DataTable>
        </div>
      </div>
        }
    submit={{
      onSubmit: (e) => { e.preventDefault(); onSubmit({ name, params, prices }); close(); },
      disabled: (!isDefault && name.trim() === '') || params.length === 0 || prices.length === 0,
    }}
  />
    );

SpecificationEditorDialog.propTypes = {
  isDefault: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  sheet: PropTypes.object,
  specification: PropTypes.object,
  newParam: PropTypes.string.isRequired,
  onSpecNameChanged: PropTypes.func.isRequired,
  onNewParamChanged: PropTypes.func.isRequired,
  addSpecParam: PropTypes.func.isRequired,
  removeSpecParam: PropTypes.func.isRequired,
  editPrice: PropTypes.func.isRequired,
  removePrice: PropTypes.func.isRequired,
};

export default injectSheet({
  title: {
    maxWidth: layout.maxWidth,
    margin: '24px auto 16px',
    display: 'flex',
    alignItems: 'center',
  },
  line: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: layout.maxWidth,
    '& > .mdl-textfield': {
      flex: 1,
    },
  },
  params: {
    marginTop: layout.rowGutter,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tableButtons: {
    width: 64,
    height: 24,
    '& > div': {
      display: 'inline-block',
    },
  },
  tableInlineButton: {
    position: 'relative',
    width: 32,
    height: 24,
    '& > button': {
      position: 'absolute',
      left: 0,
      top: -4,
    },
  },
})(SpecificationEditorDialog);
