/* @module HttpClient */
import heart from 'flashheart';
const pkg = require('../../package.json');

/**
 * Class representing HttpClient
 */
export default class HttpClient {
    constructor(options) {
        this.options = {
            name: `${pkg.name}`,
            timeout: process.env.BLACKADDER_TIMEOUT || 60000,  // default to 1m
            userAgent: `${pkg.name}/${pkg.version}`,
            defaults: {
                json: true
            },
            retries: 0 // fix for multiple call to third-party notification service (email/sms)
        };
        this.options = Object.assign(this.options, options);
        this.client = heart.createClient(this.options);
    }

    /**
     * Common method call to flashheart
     * @param {String} method
     * @param {String} url
     * @param [Object] body
     * @param [Object] options
     */
    async common(method, url, body, options) {
        method = method.toLowerCase();
        return new Promise((resolve, reject) => {
            const args = [
                url,
                body,
                options
            ];

            if ([ 'get', 'delete' ].indexOf(method) >= 0) {
                args.splice(1, 1);
            }

            args.push((error, body, response) => {
                if (error) {
                    return reject(error);
                }
                resolve({
                    response,
                    body
                });
            });

            this.client[method].apply(this.client, args);
        });
    }

    /**
     * Request with payload
     */
    async withBody(method, url, body = {}, options = { headers: {}, json: true }) {
        if (/x-www-form-urlencoded/.test(options.headers['Content-Type'])) {
            options.form = body;
            body = null;
        } else if (/form-data/.test(options.headers['Content-Type'])) {
            options.formData = body;
            body = null;
        }
        // this is the application/json
        return await this.common(method, url, body, options);
    }

    /**
     * Executes request
     */
    async exec(url, body = {}, query = {}, options = { headers: {}, json: true }, method = 'get') {
        method = method.toLowerCase();
        options.qs = query;
        if ([ 'post', 'put' ].indexOf(method) >= 0) {
            return await this.withBody(method, url, body, options);
        }
        return await this.common(method, url, query, options);
    }

    /**
     * GET
     * @param {String} url
     * @param {Object} query
     * @param {Object} options
     */
    async get(url, query = {}, options = {}) {
        options.qs = query;
        return await this.common('get', url, null, options);
    }

    /**
     * POST
     * @param {String} url
     * @param {Object} body
     * @param {Object} options
     */
    async post(url, body, options) {
        return await this.withBody('post', url, body, options);
    }

    /**
     * PUT
     * @param {String} url
     * @param {Object} body
     * @param {Object} options
     */
    async put(url, body, options) {
        return await this.withBody('put', url, body, options);
    }

    /**
     * PATCH
     * @param {String} url
     * @param {Object} body
     * @param {Object} options
     */
    async patch(url, body, options) {
        return await this.withBody('patch', url, body, options);
    }

    /**
     * DELETE
     * @param {String} url
     * @param {Object} query
     * @param {Object} options
     */
    async delete(url, query = {}, options = {}) {
        options.qs = query;
        return await this.common('delete', url, null, options);
    }
}
