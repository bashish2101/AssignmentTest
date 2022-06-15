exports.sendResponse = async (req, resp) => {
    req.status(resp.statusCode).send(resp)
};