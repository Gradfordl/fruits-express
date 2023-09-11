const React = require('react');

//This is our higher order component - setting this up for uniformity
class DefaultLayout extends React.Component {
  render() {
    return (
        <html>
            <head>
                <title>{this.props.title}</title>
                {/* linking css */}
                <link rel="stylesheet" href="/css/app.css"/>
            </head>
            <body>
                <h1>{this.props.title}</h1>
                {this.props.children}
            </body>
        </html>
    );
  }
}

module.exports = DefaultLayout;