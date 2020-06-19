/* eslint-env node */
'use strict';

const path = require('path');
const { existsSync } = require('fs');

const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');

const defaultOptions = {
    libraries: [
        'charts'
    ],
    themes: [
        'fusion'
    ]
};

module.exports = {
    name: 'ember-fusioncharts',
    description: 'A lightweight EmberJS component which provides bindings for FusionCharts JavaScript Charting Library',

    treeForVendor(defaultTree) {
        let trees = [];

        if (defaultTree) {
            trees.push(defaultTree);
        }

        const assetDir = path.join(this.project.root, 'node_modules', 'fusioncharts');

        if (existsSync(assetDir)) {
            const assetTree = fastbootTransform(new Funnel(assetDir, { destDir: 'fusioncharts', include: ['**/*.js'] }));
            trees.push(assetTree);
        }

        return new Merge(trees);
    },

    included() {
        const app = this._findHost();
        const addonConfig = app.project.config(app.env)['ember-fusioncharts'] || defaultOptions;

        app.import('vendor/fusioncharts/fusioncharts.js');

        addonConfig.libraries.forEach((lib) => {
            app.import(`vendor/fusioncharts/fusioncharts.${lib}.js`);
        });

        addonConfig.themes.forEach((theme) => {
            app.import(`vendor/fusioncharts/themes/fusioncharts.theme.${theme}.js`);
        });
    }
};
