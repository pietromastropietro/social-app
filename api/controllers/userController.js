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

const getUser = async (req, res, next)  => {
    try {
        const user = await userService.getUser(req.params.id);

        res.json(user);
    } catch (err) {
        return next(err);
    }
};

const updateUser = async (req, res, next)  => {
    try {
        await userService.updateUser(req.params.id, req.body);

        res.json({ message: 'User updated'});
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
    getUser,
    updateUser,
    deleteUser
};