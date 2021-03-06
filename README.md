# &lt;Avatr&gt;

---
Initially start as a fork of https://github.com/sitebase/react-avatar to give the user the choice of priority of queue possibilities
---

Universal avatar makes it possible to fetch/generate an avatar based on the information you have about that user.
We use a fallback system that if for example an invalid Facebook ID is used it will try Google, and so on.

For the moment we support following types:
* Facebook
* Google
* Skype
* Gravatar
* Name initials
* Custom text
* Custom image

The fallbacks are in the same order as the list you defined in props.priority.

```
priority: ['src', 'gravatar', 'facebook', 'google', 'skype', 'name', 'value'] // Default priority list
```

## Install

Install the component using [NPM](https://www.npmjs.com/):

```sh
$ npm install react-avatr --save
```

## Usage

1. Import Custom Element:

    ```js
    import Avatr from 'react-avatr';
    ```

2. Start using it!

    ```html
    <Avatr />
    ```

Some examples:

    <Avatr  size={100}
            round={true}
            email="info@studiofrenetic.com"
            facebookId="131126510267471"
            googleId="109698448540584893289"
            src="http://placekitten.com/g/101/100"
            name="Studio Frenetic"
            value="SF"
            priority={['facebook', 'google', 'gravatar', 'skype', 'src', 'name', 'value']}
            />

## License

[MIT License](http://opensource.org/licenses/MIT)
