
var React = require('react');
var Avatr = require('react-avatr');

React.render(
    <div>
        <Avatr
            size={100}
            round={true}
            email="info@studiofrenetic.com"
            facebookId="studiofrenetic"
            googleId="109698448540584893289"
            src="http://placekitten.com/g/101/100"
            name="Studio Frenetic"
            value="SF"
            priority={['facebook', 'google', 'gravatar', 'skype', 'src', 'name', 'value']}
            />
    </div>,
    document.getElementById('example')
);