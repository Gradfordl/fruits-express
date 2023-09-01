const React = require('react');

class Show extends React.Component {
   render () {
    const { name, color, readyToEat } = this.props.vegetable

    return (
      <div>
        <h1>Show Page</h1>
        The {name} is {color}.
        And {readyToEat ? "it is ready to eat!" : "it is not ready to eat. Don't do it."}
      </div>
     );
    }
 }
 module.exports  = Show;