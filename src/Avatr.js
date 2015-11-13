import React, { Component, PropTypes } from 'react';
import md5 from 'md5';

export default class Avatr extends Component {

  static propTypes = {
    colors: PropTypes.array,
    email: PropTypes.string,
    facebookId: PropTypes.string,
    googleId: PropTypes.string,
    name: PropTypes.string,
    priority: PropTypes.array,
    round: PropTypes.bool,
    size: PropTypes.number,
    skypeId: PropTypes.string,
    value: PropTypes.string
  }

  static defaultProps = {
    colors: ['#d73d32', '#7e3794', '#4285f4', '#67ae3f', '#d61a7f', '#ff4080'],
    email: null,
    facebookId: null,
    googleId: null,
    name: null,
    priority: ['src', 'gravatar', 'facebook', 'google', 'skype', 'name', 'value'],
    round: false,
    size: 100,
    skypeId: null,
    value: null
  }

  state = {
    background: null,
    priority: null,
    src: null,
    value: null
  };

  componentDidMount() {
    const { priority, value } = this.props;
    this.setState({
      background: this.randomColor(),
      priority: priority,
      value: value
    }, () => {
      this.fetch();
    });
  }

  getProtocol() {
    if( typeof window === 'undefined' )
      return 'https:';

    return window.location.protocol;
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  callNext(next) {
    const fn = ::this['get'+this.capitalizeFirstLetter(next)];

    if(typeof fn === 'function') {
      fn((event) => {
        this.fetch(event);
      });
    }
  }

  get(url, successCb, errorCb) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          successCb(JSON.parse(request.responseText));
        } else {
          errorCb(request.status);
        }
      }
    };
    request.open('GET', url, true);
    request.send();
  }

  getGoogle(next) {
    const { googleId, size } = this.props;

    if(googleId == null)
      return next();

    const url = this.getProtocol() + '//picasaweb.google.com/data/entry/api/user/' + googleId + '?alt=json';

    this.get(url, (data) => {
      const src = data.entry.gphoto$thumbnail.$t.replace('s64', 's' + size); // replace with the correct size
      this.setSrc(src);
    }, next);
  }

  getGravatar(next) {
    const { email, size } = this.props;
    if(email == null)
      return next();

    const id = email.indexOf('@') > -1 ? md5(email) : email;
    const prefix = this.getProtocol() === 'https:' ? 'https://secure.' : 'http://';
    const src = prefix + 'gravatar.com/avatar/' + id + '?s=' + size + '&d=404';

    this.setSrc(src);
  }

  getFacebook(next) {
    const { facebookId, size } = this.props;
    if(facebookId == null)
      return next();

    const src = this.getProtocol() + '//graph.facebook.com/' + facebookId + '/picture?width=' + size + '&height=' + size;

    this.setSrc(src);
  }

  getInitials(name) {
    const parts = name.split(' ');
    let initials = '';

    for(var i=0 ; i < parts.length ; i++)
    {
      initials += parts[i].substr(0, 1).toUpperCase();
    }
    return initials;
  }

  getName(next) {
    const { name } = this.props;

    if(name && name.length) {
      this.setState({
        src: null,
        value: this.getInitials( name )
      });

      return;
    }

    next();
  }

  getSkype(next) {
    const { skypeId } = this.props;

    if(skypeId == null)
      return next();

    const src = this.getProtocol() + '//api.skype.com/users/' + skypeId + '/profile/avatar';
    this.setSrc(src);
  }

  getSrc(next) {
    const { src } = this.props;

    if(src == null || src.length == 0)
      return next();

    this.setSrc(src);
  }

  getValue(next) {
    const { value } = this.props;

    if(value && value.length) {
      return;
    }

    next();
  }

  setSrc(src) {
    if( src === null )
      return;

    this.setState({
      src: src
    });
  }

  fetch(event) {
    const { priority } = this.state;

    // If fetch was triggered by img onError
    // then set state src back to null so UI will
    // automatically switch to drawn avatar if there is no other social ID available to try
    if( event && event.type === 'error' ) {
      this.setState({
        src: null
      });
    }

    // next queue method
    if(priority.length) {
      const next = priority[0];

      if(next){
        this.setState({
          priority: priority.slice(1)
        }, () => {
          this.callNext(next);
        });
      }
    }
  }

  randomColor() {
    const { colors } = this.props;
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  static Image({ round, size, src, fetch }) {
    const imageStyle = {
      borderRadius: (round ? 500 : 0),
      height: size,
      maxWidth: '100%',
      width: size
    };

    return (
      <img width={size} height={size} style={imageStyle} src={src} onError={fetch} />
    );
  }

  static Text({ background, round, size, value }) {
    const style = {
      background: background,
      borderRadius: (round ? 500 : 0),
      color: '#FFF',
      font: Math.floor(size / 2.5) + 'px/100px Helvetica, Arial, sans-serif',
      height: size,
      lineHeight: (size + Math.floor(size/10)) + 'px',
      position: 'absolute',
      textAlign: 'center',
      textTransform: 'uppercase',
      width: size
    };

    return (
      <div style={style}>{value}</div>
    );
  }

  render() {
    const { size, round } = this.props;
    const { src, value, background } = this.state;
    const hostStyle = {
      borderRadius: (round ? 500 : 0),
      display: 'inline-block',
      height: size,
      width: size
    };

    const UI = src ? <Avatr.Image size={size} src={src} round={round} fetch={::this.fetch} /> : <Avatr.Text background={background} round={round} size={size} value={value} />;

    return (
      <div style={hostStyle}>
        {UI}
      </div>
    );
  }
}
