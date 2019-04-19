
import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
var wikipedia = require("node-wikipedia");

//export const Wiki = new Mongo.Collection("Wiki");

if (Meteor.isServer) {
  // Meteor.publish("messages", function messagesPublish() {
  //   return Messages
  //     .find({}, {
  //       limit: 10,
  //       sort: {
  //         createdAt: -1
  //       }
  //     });
  // });
}


Meteor.methods({
  "wiki.check"(message)  {
    check(message, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    return new Promise((resolve, reject) => {
      wikipedia.page.data(message, { content: true }, resolve);
    });
  }
});
