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
    '.w-100': { width: '100%' },
    '.mt-1': { 'margin-top': '1rem' },
    '.mt-2': { 'margin-top': '2rem' },
    '.mt-3': { 'margin-top': '3rem' },
    '.mt-4': { 'margin-top': '4rem' },
    '.shadow--1': { boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' },
    '.shadow--2': { boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px' },
    '.shadow--3': { boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 30px, rgba(0, 0, 0, 0.227451) 0px 6px 10px' },
    '.shadow--4': { boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px' },
    '.shadow--5': { boxShadow: 'rgba(0, 0, 0, 0.298039) 0px 19px 60px, rgba(0, 0, 0, 0.219608) 0px 15px 20px' },
  },
}).attach();
