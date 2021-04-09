import React, { Component } from 'react';
import './Notifications.css'
import {alerts_costs} from '../costs/CostsInfluxQuery';
import {alerts_rooms} from '../rooms/RoomInfluxQuery';
import ReactDOM from 'react-dom';

  
  class Notifications extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          newItem: "",
          list: []
        };
      }
    
      //incorporating local storage 
      componentDidMount() {
        this.hydrateStateWithLocalStorage();
    
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
      }
    
      componentWillUnmount() {
        window.removeEventListener(
          "beforeunload",
          this.saveStateToLocalStorage.bind(this)
        );
    
        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
      }
    
      hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
          // if the key exists in localStorage
          if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);
    
            // parse the localStorage string and setState
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              // handle empty string
              this.setState({ [key]: value });
            }
          }
        }
      }
    
      saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
          // save to localStorage
          localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
      }
    
      updateInput(key, value) {
        // update react state
        this.setState({ [key]: value });
      }
    
      addItem(value) {
        // create a new item with unique id
        const newItem = {
          id: 1 + Math.random(),
          value: value,
        };
  
    
        // copy current list of items
        const list = [...this.state.list];
    
        // add the new item to the list
        list.push(newItem);
    
        // update state with new list, reset the new item input
        this.setState({
          list,
          newItem: ""
        }
        );
      }
  
        
    
      deleteItem(id) {
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted
        const updatedList = list.filter(item => item.id !== id);
    
        this.setState({ list: updatedList });
      }
  
      add_alert() {
          //console.log('inside work' + alerts.length);
          const list = [...this.state.list];

          for (var i = 0; i < alerts_costs.length; i++ ) {
              
            const newItem = {
              id: 1 + Math.random(),
              value: alerts_costs[i],
            };

              //console.log('in alert' + alerts.[i]);
               list.push(newItem);
               //console.log(list);
  
                this.setState({
                  list,
                })
          }   

          for (var i = 0; i < alerts_rooms.length; i++ ) {
    
            const newItem = {
              id: 1 + Math.random(),
              value: alerts_rooms[i],
            };

              //console.log('in alert' + alerts.[i]);
               list.push(newItem);
               //console.log(list);
  
                this.setState({
                  list,
                })
          }   
      }
      
      
      render() {
  
        return (
            
    

            <div
              style={{
                padding: 30,
                textAlign: "left",
                maxWidth: 500,
                margin: "auto"
              }}
            >
              <br />
              <input 
                style={{
                    fontSize: '25px',
                    width: '250px',
                    height: '50px',
                    position: 'absolute',
                    bottom: '835px',
                    left: '300px',
                    paddingLeft: '20px',
                    display: 'inline',
              }}
              value = "Check for Issues"
              type = 'button'
              onClick={() =>   this.add_alert()}
              />
              <br /> <br />
              <ul 
                style={{
                    color: 'white',
                    fontSize: '25px',
                    width: '1100px',
                    height: '50px',
                    position: 'absolute',
                    bottom: '700px',
                    left: '300px',
                    paddingLeft: '20px',
                    display: 'inline',
              }}>
                {this.state.list.map(item => {
                  return (
                    <li key={item.id}>
                      {item.value}
                      {' '}<button className="btn btn-floating" onClick={() => this.deleteItem(item.id)}>
                        <i class="material-icons">x</i>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

        );
      }
    }
    
    

export default Notifications;