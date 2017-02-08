import React from 'react';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import Icon from 'react-mdl/lib/Icon';

const Page = () => (
  <List>
    <ListItem>
      <ListItemContent avatar="person">Bryan Cranston</ListItemContent>
      <ListItemAction>
        <a href="#1"><Icon name="star" /></a>
        <a href="#1"><Icon name="star" /></a>
      </ListItemAction>
    </ListItem>
    <ListItem>
      <ListItemContent avatar="person">Aaron Paul</ListItemContent>
      <ListItemAction>
        <a href="#1"><Icon name="star" /></a>
      </ListItemAction>
    </ListItem>
    <ListItem>
      <ListItemContent avatar="person">Bob Odenkirk</ListItemContent>
      <ListItemAction>
        <a href="#1"><Icon name="star" /></a>
      </ListItemAction>
    </ListItem>
  </List>
);

export default Page;
