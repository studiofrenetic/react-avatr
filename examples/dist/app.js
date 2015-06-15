require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var Avatr = require('react-avatr');

React.render(React.createElement(
    'div',
    null,
    React.createElement(Avatr, {
        size: 100,
        round: true,
        email: 'info@studiofrenetic.com',
        facebookId: 'studiofrenetic',
        googleId: '109698448540584893289',
        src: 'http://placekitten.com/g/101/100',
        name: 'Studio Frenetic',
        value: 'SF',
        priority: ['facebook', 'google', 'gravatar', 'skype', 'src', 'name', 'value']
    })
), document.getElementById('example'));

},{"react":undefined,"react-avatr":undefined}]},{},[1]);
