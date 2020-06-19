/* eslint-env node */
module.exports = {
    normalizeEntityName() {},

    afterInstall() {
        return this.addPackageToProject({ name: 'fusioncharts', target: '^3.13.3-sr.1' });
    },
};
