// TODO I thinks sanitizecss is useless here since bootstrap's included. Remove it after confirming
// import 'sanitize.css/sanitize.css';
// import 'bootstrap/dist/css/bootstrap.css';
import 'react-redux-toastr/src/styles/index.scss';
import { jss } from 'react-jss';
import 'react-mdl/extra/material';
import './styles/_material-design-lite.scss';

/* eslint no-unused-expressions: 0 */
jss.createStyleSheet({
  '@global': {
    body: { 'font-family': "'Helvetica Neue', Helvetica, Arial, sans-serif" },
    'body.fontLoaded': { 'font-family': "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" },
    '#app': { 'background-color': '#fafafa', 'min-height': '100%', 'min-width': '100%' },
    // common classes
    '.w-100': { width: '100%' },
    '.mt-1': { 'margin-top': '8px !important' },
    '.mt-2': { 'margin-top': '16px !important' },
    '.mt-3': { 'margin-top': '24px !important' },
    '.mt-4': { 'margin-top': '32px !important' },
    '.mt-5': { 'margin-top': '40px !important' },
    '.mt-6': { 'margin-top': '48px !important' },
    '.shadow--1': { boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px !important' },
    '.shadow--2': { boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px !important' },
    '.shadow--3': { boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 30px, rgba(0, 0, 0, 0.227451) 0px 6px 10px !important' },
    '.shadow--4': { boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px !important' },
    '.shadow--5': { boxShadow: 'rgba(0, 0, 0, 0.298039) 0px 19px 60px, rgba(0, 0, 0, 0.219608) 0px 15px 20px !important' },
    '.material-transition': { transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms !important' },
  },
}).attach();
