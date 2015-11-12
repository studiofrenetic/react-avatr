import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Avatr from '../src/Avatr';

document.title = 'React Avatr Dev';
document.body.style.padding = '30px 40px';
document.body.style.background = 'white';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';

/*
var script = document.createElement('script');
script.src = '/webpack-dev-server.js';
document.getElementsByTagName('head')[0].appendChild(script);
*/

document.body.innerHTML = `
  <div id="dev"></div>
  <script src="/.js"></script>
`;

class Dev extends Component {
  render() {
    return (
      <div>
        <div>
          <Avatr src="https://placeimg.com/100/100/animals"/>
          <Avatr email="info@studiofrenetic.com"/>
          <Avatr facebookId="711918081"/>
          <Avatr googleId="109698448540584893289" />
        </div>
        <div>
          <Avatr skypeId="mathieu_doyon" />
          <Avatr name="Studio Frenetic" round={true} />
          <Avatr value="SF" />
          <Avatr src="https://404-error-url.com/my-image.png"
            email="info@studiofrenetic.com"
            round={true}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Dev/>, document.getElementById('dev'));
