const Thought = require("../models/Thought");

module.exports = {
  // GET /api/thoughts
  getThoughts: (req, res) => {
    Thought.find({})
      .then(thoughts => {
        res.json(thoughts);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  // GET /api/thoughts/:id
  getSingleThought: (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(thought => {
        res.json(thought);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  // POST /api/thoughts
  createThought: (req, res) => {
    Thought.create(req.body)
      .then(thought => {
        res.json(thought);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  // PUT /api/thoughts/:id, 
  updateThought: (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
    })
      .then(thought => {
        res.json(thought);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }, 

  // DELETE /api/thoughts/:id, delete a thought
  deleteThought: (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thought => {
        res.json(thought);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  // POST /api/thoughts/:thoughtId/reactions
  addReaction: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then(thought => {
        res.json(thought);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  deleteReaction: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    )
      .then(thought => {
        res.json(thought);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
};