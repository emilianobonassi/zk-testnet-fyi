const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const crypto = require("crypto");

const domain = process.env.DOMAIN;

const createEnv = async() => {
    const id = 'e' + crypto.randomBytes(8).toString("hex"); 
    await exec(`helm install ${ domain ? `--set ingress.domain=${domain}` : '' } ${id} ./resources/zk-testnet/.`);

    return { 
        id
    };
}

const getEnv = async(id) => {
    const { stdout } = await exec(`kubectl get configmap ${id}-zk-configmap -o jsonpath="{.data}"`);

    return {
        id,
        metadata: JSON.parse(stdout),
    }
};

const deleteEnv = async(id) => {
    await exec(`helm uninstall ${id}`);
}

const existsEnv = async(id) => {
    const { stdout } = await exec(`helm list -f ${id} -o json`);

    return JSON.parse(stdout).length > 0;
}

module.exports = {
    createEnv,
    getEnv,
    deleteEnv,
    existsEnv,
}