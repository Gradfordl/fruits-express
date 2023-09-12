const React = require("react");
const DefaultLayout = require("../layout/Default");

class New extends React.Component {
  render() {
    return (
      <DefaultLayout title="New Fruit Page" >
        <form action="/fruits" method="POST">
          Name: <input type="text" name="name" />
          <br />
          Color: <input type="text" name="color" />
          <br />
          Is Ready To Eat: <input type="checkbox" name="readyToEat" />
          <br />
          Image Url: <input type="text" name="img" />
          <br/>
          <input type="submit" value="Create Fruit"  />
          <nav>
          <br />
    <a href="/fruits">Go Back...</a>
</nav>
        </form>
      </DefaultLayout>
    );
  }
}

module.exports = New;
