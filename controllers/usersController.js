const User = require("../models/User");

module.exports = {
  // GET /api/users/
  getUsers: (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // GET /api/users/:id
  getSingleUser: (req, res) => {
    User.findOne({ _id: req.params._id })
      .select("-__v")
      // .populate('thoughts')
      // .populate('friends')

      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST /api/users/
  createUser: (req, res) => {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // PUT /api/users/:id
  updateUser: (req, res) => {
    User.findOneAndUpdate({ _id: req.params._id }, req.body, {
      new: true,
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // DELETE /api/users/:id
  deleteUser: (req, res) => {
    User.findOneAndDelete({ _id: req.params._id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // POST /api/users/:userId/friends/:friendId
  addFriend: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params._id },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // DELETE /api/users/:userId/friends/:friendId
  deleteFriend: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params._id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
};
