const React = require('react');

class Show extends React.Component {
   render () {
    const { name, color, readyToEat, img } = this.props.vegetable

    return (
      <div>
        <h1>Show Page</h1>
        <div>
          <img src={img}/>
          </div>
        
        The {name} is {color}.
        And {readyToEat ? "it is ready to eat!" : "it is not ready to eat. Don't do it."}
        <br />
        <nav>
          
    <a href="/vegetables">Go Back</a>
</nav>
      </div>
     );
    }
 }
 module.exports = Show;