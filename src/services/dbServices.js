'use strict';


let saveData = async function (model, data) {

    return new model(data).save();
};

let getData = async function (model, query, projection, options) {
    return model.find(query, projection, options);
};

let findOne = async function (model, query, projection, options) {
    return model.findOne(query, projection, options);
};

let findAndUpdate = async function (model, conditions, update, options) {
    return model.findOneAndUpdate(conditions, update, options);
};

let findAndRemove = async function (model, conditions) {
    return model.findOneAndRemove(conditions);
};

let update = async function (model, conditions, update, options) {
    return model.update(conditions, update, options);
};
let updateMany = async function (model, conditions, update, options) {
    return model.updateMany(conditions, update, options);
};

let remove = async function (model, condition) {
    return model.remove(condition);
};

let findSome = async function (model, ctx, query, projection, options) {
    return model.find(query, projection, options).limit(parseInt(ctx.params.itemsPerPage)).skip(parseInt(ctx.params.page));
}

let findWithPagination = (model, query, skip, limit, sort) => {
    return model.find(query).skip(skip).limit(limit).sort(sort).exec()
}

module.exports = {
    saveData: saveData,
    getData: getData,
    update: update,
    remove: remove,
    findOne: findOne,
    findAndUpdate: findAndUpdate,
    findAndRemove: findAndRemove,
    updateMany,
    findSome,
    findWithPagination
};