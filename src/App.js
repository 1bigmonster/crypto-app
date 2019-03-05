import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button';
import Pusher from 'pusher-js';

let pusher, channel;

class App extends Component {
  
  constructor(props) {
    super(props); 
    this.state = {
      symbol: "symbol",
      rows: []
    };

    this.subscribeBtcUsd = this.subscribeBtcUsd.bind(this);
    this.subscribeEthUsd = this.subscribeEthUsd.bind(this);
    
    Pusher.logToConsole = false;
    //TODO your pusher app key:
    pusher = new Pusher('YOUR_PUSHER_APP_KEY', {
      cluster: 'ap1',
      forceTLS: true
    });    
  }

  subscribe() {
    channel.unbind();
    channel.bind("ob-reset", function(data) {
      this.setState({rows: []});
      console.log("ob-reset.");
    }.bind(this));

    channel.bind("ob-data", function(data) {      
      var i = 0;
      var items = [];
      while (data[i] != null) {
        var item = { 
          price: data[i]["price"], 
          isArb: data[i]["isArb"], 
          bidex: data[i]["bidex"], 
          bidqty: data[i]["bidqty"],
          askqty: data[i]["askqty"], 
          askex: data[i]["askex"] }
        items.push(item)       
        i = i + 1;
      }
      console.log("total: " + items.length);
      this.setState({ rows: this.state.rows.concat(items) });
    }.bind(this));    
  }

  subscribeBtcUsd() {
    pusher.unsubscribe(this.state.symbol);
    console.log('unsubscribe ' + this.state.symbol);

    channel = pusher.subscribe("btcusd");     
    this.subscribe();
    this.setState({rows: []});
    this.setState({symbol: "btcusd"});
    console.log('subscribe btcusd');
  }

  subscribeEthUsd() {
    pusher.unsubscribe(this.state.symbol);
    console.log('unsubscribe ' + this.state.symbol);

    channel = pusher.subscribe("ethusd");     
    this.subscribe();
    this.setState({rows: []});
    this.setState({symbol: "ethusd"});
    console.log('subscribe ethusd');
  }   
  
  render() {
    return (
    <div className="App">      
      <ButtonToolbar>
        <Button variant="btcusd" onClick={this.subscribeBtcUsd}>BTC/USD</Button>
        <Button variant="ethusd" onClick={this.subscribeEthUsd}>ETH/USD</Button>
        </ButtonToolbar>
      <table className="ob-table">
        <thead>
          <tr id="ob-header">
            <th>BidEx</th><th>BidQty</th><th>{this.state.symbol.toUpperCase()}</th><th>AskQty</th><th>AskEx</th></tr>
          </thead>   
        <tbody>
          {this.state.rows.map((row, i) =>
          <tr className={ row.isArb ? "arb" : ""} key={i}>
            <td className="ob-bid">{row.bidex}</td>
            <td className="ob-bid">{row.bidqty}</td>
            <td>{row.price}</td>
            <td className="ob-ask">{row.askqty}</td>
            <td className="ob-ask">{row.askex}</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
