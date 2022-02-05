// Services import
const userService = require('../services/userService')

const getUsers = async (req, res, next)  => {
    try {
        const users = await userService.getUsers();

        res.json(users);
    } catch (err) {
        return next(err);
    }
};

const getUsersByName = async (req, res, next)  => {
    try {
        const users = await userService.getUsersByName(req.query.name);

        res.json(users);
    } catch (err) {
        return next(err);
    }
};

const getUser = async (req, res, next)  => {
    try {
        const user = await userService.getUser(req.params.id);

        res.json(user);
    } catch (err) {
        return next(err);
    }
};

const getUserFriends = async (req, res, next)  => {
    try {
        const friends = await userService.getUserFriends(req.params.id);

        res.json(friends);
    } catch (err) {
        return next(err);
    }
};

const getSuggestedUsers = async (req, res, next)  => {
    try {
        const suggested = await userService.getSuggestedUsers(req.params.id);

        res.json(suggested);
    } catch (err) {
        return next(err);
    }
};

const updateUser = async (req, res, next)  => {
    try {
        const message = await userService.updateUser(req.params.id, req.body);

        res.json({ message: message });
    } catch (err) {
        return next(err);
    }
};
const deleteUser = async (req, res, next)  => {
    try {
        await userService.deleteUser(req.params.id);

        res.json({ message: 'User deleted'});
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getUsers,
    getUsersByName,
    getUser,
    getUserFriends,
    getSuggestedUsers,
    updateUser,
    deleteUser
};