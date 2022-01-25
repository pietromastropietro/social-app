const relationService = require('../services/relationService')

const getRelation = async (req, res, next)  => {
    try {
        const relation = await relationService.getRelation(req.params.ids);
        // console.log(JSON.stringify(relation,null,2));

        res.json(relation);
    } catch (err) {
        return next(err);
    }
};

const getFriendsRequests = async (req, res, next)  => {
    try {
        const requests = await relationService.getFriendsRequests(req.params.id);

        res.json(requests);
    } catch (err) {
        return next(err);
    }
};

const createRelation = async (req, res, next)  => {
    try {
        const relation = await relationService.createRelation(req.body);

        res.json({ message: 'Relation created', relation: relation});
    } catch (err) {
        return next(err);
    }
};

const updateRelation = async (req, res, next)  => {
    console.log("te");
    try {
        await relationService.updateRelation(req.params.id);

        res.json({ message: 'Relation updated'});
    } catch (err) {
        return next(err);
    }
};

const deleteRelation = async (req, res, next)  => {
    try {
        await relationService.deleteRelation(req.params.id);

        res.json({ message: 'Relation deleted'});
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getRelation,
    getFriendsRequests,
    createRelation,
    updateRelation,
    deleteRelation
};