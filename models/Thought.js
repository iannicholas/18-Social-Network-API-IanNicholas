const { Schema, model } = require("mongoose");
const userSchema = require("./User");
const reactionSchema = require("./Reaction");

// schema to create the Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "Thought text is required"],
      length: [1, 280, "Thought text must be between 1 and 280 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      getter: function () {
        return this.createdAt.toLocaleString();
      },
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// virtual property to get the amount of reactions a thought has
thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// initializes the Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
