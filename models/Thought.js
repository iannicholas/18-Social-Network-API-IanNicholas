const { Schema, model, Types } = require("mongoose");
const userSchema = require("./User");

const reactionSchema = new Schema(
  {
    reactionId: {
      // use the ObjectId type from mongoose
      type: Schema.Types.ObjectId,
      // default value is set to new mongoose.Types.ObjectId()
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, "Reaction body is required"],
      length: [1, 280, "Reaction body must be between 1 and 280 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      getter: function () {
        return this.createdAt.toLocaleString();
      },
    },

    // reaction fields subdocument schema in the Thought model
    // thought: {
    //   type: Schema.Types.ObjectId,
    //   ref: "thought",
    //   required: [true, "Thought is required"],
    // },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

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
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// virtual property to get the amount of reactions a thought has
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// initializes the Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
