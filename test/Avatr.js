import { expect } from 'chai';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Avatr from '../src/Avatr';

describe('Avatr', () => {
  it('create avatar component with text', () => {
    const string = renderToString(<Avatr value="SF" />);
    expect(string).to.match(/SF/);
  });
});
