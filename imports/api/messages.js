import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export const Messages = new Mongo.Collection("messages");

if (Meteor.isServer) {
  Meteor.publish("messages", function messagesPublish() {
    return Messages
      .find({}, {limit: 10});


  });
}


Meteor.methods({
  "messages.insert"(message)  {
    check(message, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Messages.insert({
      message : message,
      owner : Meteor.user().username
    });
  }
});
