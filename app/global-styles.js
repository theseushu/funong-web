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
    'shadow--2dp': { boxShadow: '0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)' },
    'shadow--3dp': { boxShadow: '0 3px 4px 0 rgba(0,0,0,.14),0 3px 3px -2px rgba(0,0,0,.2),0 1px 8px 0 rgba(0,0,0,.12)' },
    'shadow--4dp': { boxShadow: '0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2)' },
    'shadow--6dp': { boxShadow: '0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12),0 3px 5px -1px rgba(0,0,0,.2)' },
    'shadow--8dp': { boxShadow: '0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.2)' },
    'shadow--16dp': { boxShadow: '0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2)' },
    'shadow--24dp': { boxShadow: '0 9px 46px 8px rgba(0,0,0,.14),0 11px 15px -7px rgba(0,0,0,.12),0 24px 38px 3px rgba(0,0,0,.2)'},
  },
}).attach();
