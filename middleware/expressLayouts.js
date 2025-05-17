const fs = require('fs');
const path = require('path');

/**
 * Express middleware for EJS layouts
 * Provides layout functionality for EJS templates
 * @param {Object} options - Configuration options
 * @param {string} options.defaultLayout - Default layout to use
 * @returns {Function} Express middleware function
 */
module.exports = function expressLayouts(options = {}) {
    const defaultOptions = {
        defaultLayout: 'main'
    };

    const config = { ...defaultOptions, ...options };

    return function(req, res, next) {
        const originalRender = res.render;

        res.render = function(view, locals = {}, callback) {
            const layout = locals.layout === undefined ? config.defaultLayout : locals.layout;
            
            if (layout === false) {
                return originalRender.call(this, view, locals, callback);
            }

            return originalRender.call(this, view, locals, function(err, html) {
                if (err) {
                    return callback ? callback(err) : next(err);
                }

                res.locals.body = html;

                const layoutPath = `layouts/${layout}`;
                return originalRender.call(res, layoutPath, locals, callback);
            });
        };

        next();
    };
};