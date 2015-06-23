'use strict';

var React = require('react');
var md5 = require('MD5');

var Avatr = React.createClass({
    displayName: 'Avatr',

    propTypes: {
        priority: React.PropTypes.array,
        colors: React.PropTypes.array,
        name: React.PropTypes.string,
        value: React.PropTypes.string,
        email: React.PropTypes.string,
        facebookId: React.PropTypes.string,
        googleId: React.PropTypes.string,
        skypeID: React.PropTypes.string,
        round: React.PropTypes.bool,
        size: React.PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
        return {
            colors: ['#d73d32', '#7e3794', '#4285f4', '#67ae3f', '#d61a7f', '#ff4080'],
            name: null,
            value: null,
            email: null,
            facebookId: null,
            skypeId: null,
            googleId: null,
            round: false,
            size: 100
        };
    },

    getInitialState: function getInitialState() {
        return {
            src: null,
            value: null,
            firstFetch: false,
            priority: ['src', 'gravatar', 'facebook', 'google', 'skype', 'name', 'value']
        };
    },

    randomColor: function randomColor() {
        var index = Math.floor(Math.random() * this.props.colors.length);
        return this.props.colors[index];
    },

    setSrc: function setSrc(src, context) {
        if (src === null) return;

        if (context === null) context = this;

        this.setState({
            src: src
        });
    },

    getProtocol: function getProtocol() {
        if (typeof window === 'undefined') return 'https:';

        return window.location.protocol;
    },

    getGravatar: function getGravatar(next, context) {
        if (context.props.email == null) return next();

        var id = context.props.email;
        if (id.indexOf('@') > -1) id = md5(id);

        var prefix = context.getProtocol() === 'https:' ? 'https://secure.' : 'http://';
        var src = prefix + 'gravatar.com/avatar/' + id + '?s=' + context.props.size + '&d=404';
        context.setSrc(src, context);
    },

    getFacebook: function getFacebook(next, context) {
        if (context.props.facebookId == null) return next();

        var src = context.getProtocol() + '//graph.facebook.com/' + context.props.facebookId + '/picture?width=' + context.props.size + '&height=' + context.props.size;
        context.setSrc(src, context);
    },

    getGoogle: function getGoogle(next, context) {
        if (context.props.googleId == null) return next();

        var url = context.getProtocol() + '//picasaweb.google.com/data/entry/api/user/' + context.props.googleId + '?alt=json';
        context.get(url, function (data) {
            var src = data.entry.gphoto$thumbnail.$t.replace('s64', 's' + context.props.size); // replace with the correct size
            context.setSrc(src, context);
        }, next);
    },

    getSkype: function getSkype(next, context) {
        if (context.props.skypeId == null) return next();

        var src = context.getProtocol() + '//api.skype.com/users/' + context.props.skypeId + '/profile/avatar';
        context.setSrc(src, context);
    },

    getSrc: function getSrc(next, context) {
        if (context.props.src == null || context.props.src.length == 0) return next();

        context.setSrc(context.props.src, context);
    },

    get: function get(url, successCb, errorCb) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var data = JSON.parse(request.responseText);
                    successCb(data);
                } else {
                    errorCb(request.status);
                }
            }
        };
        request.open('GET', url, true);
        request.send();
    },

    getName: function getName(next, context) {
        if (context.props.name && context.props.name.length) {
            context.setState({
                src: null,
                value: context.getInitials(context.props.name)
            });
            return;
        }

        next();
    },

    getValue: function getValue(next, context) {
        if (context.props.value && context.props.value.length) {
            context.setState({
                src: null,
                value: context.props.value
            });
            return;
        }

        next();
    },

    fetch: function fetch(evt, context) {
        // If fetch was triggered by img onError
        // then set state src back to null so getUI will
        // automatically switch to drawn avatar if there is no other social ID available to try
        if (evt && evt.type === 'error') {
            context = this;
            context.state.src = null;
        } else if (!context) {
            context = this;
        }

        // next queue method
        if (this.state.priority.length) {
            var next = this.state.priority[0];
            if (next) {
                this.setState({
                    priority: this.state.priority.slice(1)
                }, function () {
                    context.callNext(next, context);
                });
            }
        }
    },

    callNext: function callNext(next, context) {
        var fn = context['get' + context.capitalizeFirstLetter(next)];
        if (typeof fn === 'function') {
            fn((function (e) {
                context.fetch(e, context);
            }).bind(context), context);
        }
    },

    getInitials: function getInitials(name) {
        var parts = name.split(' ');
        var initials = '';
        for (var i = 0; i < parts.length; i++) {
            initials += parts[i].substr(0, 1).toUpperCase();
        }
        return initials;
    },

    capitalizeFirstLetter: function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.src && nextProps.src !== this.props.src) {
            this.setState({ src: nextProps.src });
        }

        if (nextProps.value && nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }

        if (nextProps.priority && nextProps.priority !== this.props.priority) {
            this.setState({
                priority: this.props.priority
            });
        }
    },

    componentDidMount: function componentDidMount() {
        // fix first mount issue duplicate props.priority first doest not exists anymore
        if (this.state.firstFetch === false) {
            this.setState({
                firstFetch: true,
                priority: this.props.priority
            }, function () {
                this.fetch();
            });
        }
    },

    getUI: function getUI() {
        var imageStyle = {
            maxWidth: '100%',
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.round ? 500 : 0
        };

        var initialsStyle = {
            background: this.randomColor(),
            width: this.props.size,
            height: this.props.size,
            font: Math.floor(this.props.size / 2.5) + 'px/100px Helvetica, Arial, sans-serif',
            color: '#FFF',
            textAlign: 'center',
            textTransform: 'uppercase',
            lineHeight: this.props.size + Math.floor(this.props.size / 10) + 'px',
            borderRadius: this.props.round ? 500 : 0
        };

        if (this.state.src) {
            return React.createElement('img', { width: this.props.size, height: this.props.size, style: imageStyle, src: this.state.src, onError: this.fetch });
        } else {
            return React.createElement(
                'div',
                { style: initialsStyle },
                this.state.value
            );
        }
    },

    render: function render() {
        var hostStyle = {
            display: 'inline-block',
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.round ? 500 : 0
        };
        var ui = this.getUI();

        return React.createElement(
            'div',
            { style: hostStyle },
            ui
        );
    }
});

module.exports = Avatr;