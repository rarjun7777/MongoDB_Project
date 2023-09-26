// utils/errorHandlers.js
exports.handleError = (res, error) => {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
};

exports.handleUnauthorized = (res) => {
    return res.status(401).json({ error: 'Unauthorized' });
};

exports.handleBadRequest = (res, message) => {
    return res.status(400).json({ error: message });
};
