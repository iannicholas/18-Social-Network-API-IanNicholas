const User = require("../models/User");
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

  // POST /api/thoughts and push to created thoughts _id
  // createThought(req, res) {
  //   Thought.create(req.body)
  //     .then((thought) => {
  //       return Thought.findOneAndUpdate(
  //         { _id: req.body.thoughtId },
  //         { $push: { thoughts: thought._id } },
  //         { new: true }
  //       );
  //     })
  //     .then((dbThoughtData) => res.json(dbThoughtData))
  //     // .then((post) =>
  //     //   !post
  //     //     ? res
  //     //         .status(404)
  //     //         .json({ message: 'Thought created, but no users with this ID' })
  //     //     : res.json({ message: 'Thought created' })
  //     // )
  //     .catch((err) => res.status(500).json(err));
  // },


  // createThought: (req, res) => {
  //   Thought.create(req.body)
  //     .then(thought => {
  //       res.json(thought);
  //     })
  //     .catch(err => {
  //       res.status(500).json(err);
  //     });
  //     Thought.findOneAndUpdate(
  //       { $push: { thoughts: req.body._id } },
  //     )
  // },

  createThought: (req, res) => {
    Thought.create(req.body)
      .then((post) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: post._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Though created, but found no user with that ID' })
          : res.json('Created the thought')
      )
      .catch((err) => {
        console.log(err);
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
  // DELETE /api/thoughts/:thoughtId/:reactionId
  deleteReaction: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
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