const { Schema, model } = require('mongoose');
const userSchema = require('./User');
const thoughtSchema = require('./Thought');

// schema to create the Reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      // use the ObjectId type from mongoose
      type: Schema.Types.ObjectId,
      // default value is set to new mongoose.Types.ObjectId()
      default: new Schema.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, 'Reaction body is required'],
      length: [1, 280, 'Reaction body must be between 1 and 280 characters'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      getter: function() {
        return this.createdAt.toLocaleString();
      }
    },

    // reaction fields subdocument schema in the Thought model
    thought: {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
      required: [true, 'Thought is required'],
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// initializes the Reaction model
const Reaction = model('Reaction', reactionSchema);

// export the Reaction model
module.exports = Reaction;