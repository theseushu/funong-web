import { jss } from 'react-jss';

/* eslint no-unused-expressions: 0 */
jss.createStyleSheet({
  '@global': {
    'html, body': { height: '100%', width: '100%' },
    body: { 'font-family': "'Helvetica Neue', Helvetica, Arial, sans-serif" },
    'body.fontLoaded': { 'font-family': "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" },
    '#app': { 'background-color': '#fafafa', 'min-height': '100%', 'min-width': '100%' },
    'p, label': { 'font-family': "Georgia, Times, 'Times New Roman', serif", 'line-height': '1.5em' },
    // common classes
    'w-100': { width: '100%' },
    'mt-1': { 'margin-top': '1rem' },
    'mt-2': { 'margin-top': '2rem' },
    'mt-3': { 'margin-top': '3rem' },
    'mt-4': { 'margin-top': '4rem' },
  },
}).attach();
