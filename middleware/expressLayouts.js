// Express middleware for EJS layouts
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
        // Override the render method to include layout functionality
        const originalRender = res.render;

        res.render = function(view, locals = {}, callback) {
            // Get layout from locals or use default
            const layout = locals.layout === undefined ? config.defaultLayout : locals.layout;
            
            // If layout is false, use original render method
            if (layout === false) {
                return originalRender.call(this, view, locals, callback);
            }

            // Modify render to use layout
            return originalRender.call(this, view, locals, function(err, html) {
                if (err) {
                    return callback ? callback(err) : next(err);
                }

                // Store the content to inject into the layout
                res.locals.body = html;

                // Render the layout with the view content
                const layoutPath = `layouts/${layout}`;
                return originalRender.call(res, layoutPath, locals, callback);
            });
        };

        next();
    };
};