import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages.js";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      information: {
        title:"",
        text:{
          "*":"<div></div>"
        },
        categories:[{"*":""}],
        externallinks:["null"]
      }
    };
  }
  createMarkup() {
    return {__html: this.state.information.text["*"]};
  }
  renderMessages() {
    //console.log("information", this.state.information);
    //console.log("informationlinks:", this.state.information.text["*"]);
    return (<div>
      <div className="row"><h3>title:</h3></div>
      <div className="row">{this.state.information.title}</div>
      <div className="row"><h3>page id:</h3></div>
      <div className="row">{this.state.information.pageid}</div>
      <div className="row"><h3>categoies:</h3></div>
      {this.state.information.categories.map(m =><div className="row" >{m["*"]}</div>)}
      <div className="row"><h3>external links:</h3></div>
      
      {this.state.information.externallinks.map(m =><div className="row"><a href={m}>{m}</a></div>)}
      
      <div className="row"><h3>things on wiki:</h3></div>
      <div dangerouslySetInnerHTML={this.createMarkup()} />
    </div>);
      //{this.state.information.categories.map(m =><div className="row" >{m["*"]}</div>)}
    //<div className="row">{this.state.information.text["*"].toString()}</div>
    //<div className="card">{this.state.information.text}</div>
    //<div className="card">{this.state.information.links}</div>
    // return this.state.information.map(m =>
    //   <div className="card" key={m._id}>{m.title} : {m.links}</div>);
  }

  onChange(evt) {
    console.log("change", evt.target.value);
    this.setState({
      message: evt.target.value
    });
  }

  onKey(evt) {

    Meteor.call("wiki.check",
      this.state.message,
      (err, res) => {
        if (err) {
          alert("There was error inserting check the console");
          console.log(err);
          return;
        }

        console.log("checked wiki", res);
        if (res != undefined) {
          this.setState({
            information: res
          });
        }
      });


      // // Messages.insert(
      // //   {
      // //     message: this.state.message,
      // //     owner : Meteor.user().username
      // //   },
      // //   (err, res) => {
      // //     if (err) {
      // //       alert("There was error inserting check the console");
      // //       console.log(err);
      // //       return;
      // //     }

      // //     console.log("Message inserted", res);
      // //     this.setState({
      // //       message: ""
      // //     });
      // //   }
      // );
    
  }

  render() {
    console.log("Messages", this.props.messages);
    return (
      <div>
        <h2>put something and click search!</h2>
        <label htmlFor="inMessage">
          Message:{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter your message"
            value={this.state.message}
            onChange={this.onChange.bind(this)}
          />
          <button type="button" onClick={this.onKey.bind(this)}>search!</button>
          <div className="messages">{this.renderMessages()}</div>
        </label>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(() => {
  const handle = Meteor.subscribe("messages");
  return {
    messages: Messages.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(Chat);