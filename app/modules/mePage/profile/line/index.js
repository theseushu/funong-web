import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import styles, { layout } from '../styles';

const Title = ({ classes, title }) => (
  <Cell component="h6" {...layout.title} className={classes.title}>
    {title}
  </Cell>
);
Title.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string.isRequired,
}

const Content = ({ classes, content }) => (
  <Cell {...layout.content} className={classes.content}>
    <span className={classes.textfield}>
      {content}
    </span>
  </Cell>
);
Content.propTypes = {
  classes: PropTypes.object,
  content: PropTypes.any.isRequired,
}

const Line = ({ sheet: { classes }, title, content, children }) => (
  <Grid className={classes.grid}>
    <Title title={title} classes={classes} />
    <Content content={content} classes={classes} />
    <Cell {...layout.children} className={classes.content}>
      {children}
    </Cell>
  </Grid>
);
Line.propTypes = {
  sheet: PropTypes.object,
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  children: PropTypes.any,
};

export default injectSheet({
  ...styles,
})(Line);
