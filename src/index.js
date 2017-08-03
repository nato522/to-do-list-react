import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ENTER = "Enter";

class ItemReceiver extends React.Component {
  render(){
    return(
      <div className="item-receiver">
        <input
          type="text"
          placeholder="but this time also..."
          onKeyPress={ this.props.addItem }
        />
      </div>
    );
  }
}

class ListItem extends React.Component {
  render(){
    return(
      <li
        className="list-item"
        onClick={ this.props.deleteItem }
      >
        { this.props.value }
      </li>
    );
  }
}

class ShoppingList extends React.Component {
  renderItem(i, pos){
    return(
      <ListItem
        key={ pos }
        value={ i }
        deleteItem={() => this.props.deleteItem(pos) }
      />
    );
  }

  render(){
    return(
      <div className="shopping-list">
        <ul>
          {this.props.itemsList.map((element, position) =>
            this.renderItem(element, position)
          )}
        </ul>
      </div>
    );
  }
}

class Eraser extends React.Component {
  render(){
    return(
      <div className="eraser">
        <button
          type="button"
          onClick={ this.props.clearList }
          disabled={ this.props.itemsList.length === 0 }
          >
            Forget that! Let's start again
          </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      item: null,
      itemsList: []
    };
  }

  addItem = (e) => {
    const list = this.state.itemsList.slice();
    if (e.key === ENTER) {
      var newItem = e.target.value;
      list.push(newItem);
      e.target.value = "";
      this.setState({
        itemsList: list
      });
    }
  }

  clearAll = () => {
    const list = [];
    this.setState({
      itemsList: list
    });
  }

  deleteItem = (i) => {
    const list = this.state.itemsList.slice();
    list.splice(i,1);
    this.setState({
      itemsList: list
    });
  }

  render(){
    return(
      <div className="app">
        <h1>Pinky and the Brain's to-do-list</h1>
        <div className="pinky-quote">
          <img src={require("./images/pinky.png")} alt="Pinky" title="Pinky" />
          <p>
            What are we going to do tomorrow night?
          </p>
        </div>
        <div className="clearfix"></div>
        <div className="the-brain-quote">
          <img src={require("./images/the-brain.png")} alt="The Brain" title="The Brain" />
          <p>
            The same thing we do every night, Pinky - try to take over the world!!
          </p>
        </div>
        <div className="clearfix"></div>
        <hr/>
        <ShoppingList
          itemsList={ this.state.itemsList }
          deleteItem={(i) => this.deleteItem(i) }
        />
        <ItemReceiver
          newItem={ this.state.item }
          addItem={ this.addItem }
        />
        <Eraser
          clearList={ this.clearAll }
          itemsList={ this.state.itemsList }
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

window.onload = function(e){
  document.getElementsByTagName("input")[0].focus();
}
