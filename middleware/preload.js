const collectionService = {};

function preload(Collection) {
    return async function (req, res, next) {
        const id = req.params.id;
        //TODO change property name to match collection
        const data = await collectionService.getById(id);
        res.locals.data = data;

        next();
    };
}

module.exports = preload;