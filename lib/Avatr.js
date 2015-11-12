'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _md5 = require('md5');

var _md52 = _interopRequireDefault(_md5);

var Avatr = (function (_Component) {
  _inherits(Avatr, _Component);

  function Avatr() {
    _classCallCheck(this, Avatr);

    _get(Object.getPrototypeOf(Avatr.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      background: null,
      priority: null,
      src: null,
      value: null
    };
  }

  _createClass(Avatr, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this = this;

      var _props = this.props;
      var priority = _props.priority;
      var value = _props.value;

      this.setState({
        background: this.randomColor(),
        priority: priority,
        value: value
      }, function () {
        _this.fetch();
      });
    }
  }, {
    key: 'getProtocol',
    value: function getProtocol() {
      if (typeof window === 'undefined') return 'https:';

      return window.location.protocol;
    }
  }, {
    key: 'capitalizeFirstLetter',
    value: function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }, {
    key: 'callNext',
    value: function callNext(next) {
      var _this2 = this;

      var fn = this['get' + this.capitalizeFirstLetter(next)].bind(this);

      if (typeof fn === 'function') {
        fn(function (event) {
          _this2.fetch(event);
        });
      }
    }
  }, {
    key: 'get',
    value: function get(url, successCb, errorCb) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
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
  }, {
    key: 'getGoogle',
    value: function getGoogle(next) {
      var _this3 = this;

      var _props2 = this.props;
      var googleId = _props2.googleId;
      var size = _props2.size;

      if (googleId == null) return next();

      var url = this.getProtocol() + '//picasaweb.google.com/data/entry/api/user/' + googleId + '?alt=json';

      this.get(url, function (data) {
        var src = data.entry.gphoto$thumbnail.$t.replace('s64', 's' + size); // replace with the correct size
        _this3.setSrc(src);
      }, next);
    }
  }, {
    key: 'getGravatar',
    value: function getGravatar(next) {
      var _props3 = this.props;
      var email = _props3.email;
      var size = _props3.size;

      if (email == null) return next();

      var id = email.indexOf('@') > -1 ? (0, _md52['default'])(email) : email;
      var prefix = this.getProtocol() === 'https:' ? 'https://secure.' : 'http://';
      var src = prefix + 'gravatar.com/avatar/' + id + '?s=' + size + '&d=404';

      this.setSrc(src);
    }
  }, {
    key: 'getFacebook',
    value: function getFacebook(next) {
      var _props4 = this.props;
      var facebookId = _props4.facebookId;
      var size = _props4.size;

      if (facebookId == null) return next();

      var src = this.getProtocol() + '//graph.facebook.com/' + facebookId + '/picture?width=' + size + '&height=' + size;

      this.setSrc(src);
    }
  }, {
    key: 'getInitials',
    value: function getInitials(name) {
      var parts = name.split(' ');
      var initials = '';

      for (var i = 0; i < parts.length; i++) {
        initials += parts[i].substr(0, 1).toUpperCase();
      }
      return initials;
    }
  }, {
    key: 'getName',
    value: function getName(next) {
      var name = this.props.name;

      if (name && name.length) {
        this.setState({
          src: null,
          value: this.getInitials(name)
        });

        return;
      }

      next();
    }
  }, {
    key: 'getSkype',
    value: function getSkype(next) {
      var skypeId = this.props.skypeId;

      if (skypeId == null) return next();

      var src = this.getProtocol() + '//api.skype.com/users/' + skypeId + '/profile/avatar';
      this.setSrc(src);
    }
  }, {
    key: 'getSrc',
    value: function getSrc(next) {
      var src = this.props.src;

      if (src == null || src.length == 0) return next();

      this.setSrc(src);
    }
  }, {
    key: 'getValue',
    value: function getValue(next) {
      var value = this.props.value;

      if (value && value.length) {
        return;
      }

      next();
    }
  }, {
    key: 'setSrc',
    value: function setSrc(src) {
      if (src === null) return;

      this.setState({
        src: src
      });
    }
  }, {
    key: 'fetch',
    value: function fetch(event) {
      var _this4 = this;

      var priority = this.state.priority;

      // If fetch was triggered by img onError
      // then set state src back to null so UI will
      // automatically switch to drawn avatar if there is no other social ID available to try
      if (event && event.type === 'error') {
        this.setState({
          src: null
        });
      }

      // next queue method
      if (priority.length) {
        (function () {
          var next = priority[0];

          if (next) {
            _this4.setState({
              priority: priority.slice(1)
            }, function () {
              _this4.callNext(next);
            });
          }
        })();
      }
    }
  }, {
    key: 'randomColor',
    value: function randomColor() {
      var colors = this.props.colors;

      var index = Math.floor(Math.random() * colors.length);
      return colors[index];
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props;
      var size = _props5.size;
      var round = _props5.round;
      var _state = this.state;
      var src = _state.src;
      var value = _state.value;
      var background = _state.background;

      var hostStyle = {
        borderRadius: round ? 500 : 0,
        display: 'inline-block',
        height: size,
        width: size
      };

      var UI = src ? _react2['default'].createElement(Avatr.Image, { size: size, src: src, round: round, fetch: this.fetch.bind(this) }) : _react2['default'].createElement(Avatr.Text, { background: background, round: round, size: size, value: value });

      return _react2['default'].createElement(
        'div',
        { style: hostStyle },
        UI
      );
    }
  }], [{
    key: 'Image',
    value: function Image(_ref) {
      var round = _ref.round;
      var size = _ref.size;
      var src = _ref.src;
      var fetch = _ref.fetch;

      var imageStyle = {
        borderRadius: round ? 500 : 0,
        height: size,
        maxWidth: '100%',
        width: size
      };

      return _react2['default'].createElement('img', { width: size, height: size, style: imageStyle, src: src, onError: fetch });
    }
  }, {
    key: 'Text',
    value: function Text(_ref2) {
      var background = _ref2.background;
      var round = _ref2.round;
      var size = _ref2.size;
      var value = _ref2.value;

      var style = {
        background: background,
        borderRadius: round ? 500 : 0,
        color: '#FFF',
        font: Math.floor(size / 2.5) + 'px/100px Helvetica, Arial, sans-serif',
        height: size,
        lineHeight: size + Math.floor(size / 10) + 'px',
        position: 'absolute',
        textAlign: 'center',
        textTransform: 'uppercase',
        width: size
      };

      return _react2['default'].createElement(
        'div',
        { style: style },
        value
      );
    }
  }, {
    key: 'propTypes',
    value: {
      colors: _react.PropTypes.array,
      email: _react.PropTypes.string,
      facebookId: _react.PropTypes.string,
      googleId: _react.PropTypes.string,
      name: _react.PropTypes.string,
      priority: _react.PropTypes.array,
      round: _react.PropTypes.bool,
      size: _react.PropTypes.number,
      skypeId: _react.PropTypes.string,
      value: _react.PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
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
    },
    enumerable: true
  }]);

  return Avatr;
})(_react.Component);

exports['default'] = Avatr;
module.exports = exports['default'];