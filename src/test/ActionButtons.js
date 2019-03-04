import React, { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button';

class ActionButtons extends React.Component {

    addBid() {
      console.log('add bid.');
    }

    addOffer() {
      console.log('add offer.');
    }

    render() {
      return (
        <ButtonToolbar>
            <Button variant="addBid" onClick={this.addBid}>add bid</Button>
            <Button variant="addOffer" onClick={this.addOffer}>add offer</Button>
            <Button variant="btcusd">BTC/USD</Button>
            <Button variant="ethusd">ETH/USD</Button>            
        </ButtonToolbar>
      );
    }
  }

export default ActionButtons;
