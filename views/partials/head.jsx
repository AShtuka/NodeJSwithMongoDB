const React = require('react');

function Head(props) {
    const  {title} = props;
    return (
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="/index.css" />
                <link rel="stylesheet" href="/errorPage.css" />
                <title>{title}</title>
            </head>
            )
}

module.exports = Head;