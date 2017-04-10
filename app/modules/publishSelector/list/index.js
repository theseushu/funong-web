import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import Checkbox from 'react-mdl/lib/Checkbox';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import { colors, breakpoints } from 'modules/common/styles';
import Thumbnail from 'modules/common/publishes/thumbnail';
import { generateDisplayName } from 'utils/publishUtils';

const PublishSelectorList = ({ classes, single, type, entries, selected = [], onSelect }) => (
  <List className={classes.list}>
    {entries.map((entry, i) => {
      const checked = !!_find(selected, (p) => p && p.objectId === entry.objectId);
      return (
        <ListItem key={i}>
          <ListItemContent
            avatar={<div><Thumbnail type={type} thumbnail={entry.thumbnail} className={classes.avatar} /></div>}
          >
            {generateDisplayName(entry)}
          </ListItemContent>
          <ListItemAction className={classes.actions}>
            <Checkbox
              checked={checked}
              onChange={(e) => {
                e.preventDefault();
                if (!checked) {
                  if (single) {
                    onSelect([entry]);
                  } else {
                    onSelect([...selected, entry]);
                  }
                } else if (single) {
                  onSelect([]);
                } else {
                  onSelect(selected.filter((p) => p.objectId !== entry.objectId));
                }
              }}
            />
          </ListItemAction>
        </ListItem>
      );
    })}
  </List>
);

PublishSelectorList.propTypes = {
  single: PropTypes.bool,
  type: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired,
  selected: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

export default injectSheet({
  list: {
    width: '100%',
    '& > li': {
      borderBottom: `solid 1px ${colors.colorLightGrey}`,
    },
  },
  avatar: {
    width: 52,
    height: 52,
  },
  actions: {
    justifyContent: 'center',
    [breakpoints.mediaTabletBelow]: {
      display: 'none !important',
    },
  },
})(PublishSelectorList);
