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
        defaultLayout: 'HomeView' // Default layout file name is 'main'
    };

    const config = { ...defaultOptions, ...options };

    return function(req, res, next) {
        const originalRender = res.render;

        res.render = function(view, locals = {}, callback) {
            const layout = locals.layout === undefined ? config.defaultLayout : locals.layout;

            if (layout === false) {
                // If layout is explicitly set to false, render the view without a layout
                return originalRender.call(this, view, locals, callback);
            }

            // Render the actual view to get its HTML content
            return originalRender.call(this, view, locals, function(err, html) {
                if (err) {
                    // If there's an error rendering the view, pass it to the callback or next middleware
                    return callback ? callback(err) : next(err);
                }

                // Pass the rendered HTML of the view as 'body' to the layout
                res.locals.body = html;

                // Modified: Layout path now directly uses the layout name.
                // This assumes the layout file (e.g., 'main.ejs') is directly in the 'views' directory.
                const layoutPath = layout;
                return originalRender.call(res, layoutPath, res.locals, callback);
            });
        };

        next();
    };
};