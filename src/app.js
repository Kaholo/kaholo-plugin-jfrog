const child_process = require("child_process");

const DEPLOY_AN_ARTIFACT = (action) => {
    return new Promise((resolve, reject) => {
        const execString = `curl -u ${action.params.AUTH} -x PUT "${action.params.DEPLOY_TO}" -T ${action.params.FILE_PATH}`;
        child_process.exec(execString, (error, stdout, stderr) => {
            if (error) {
                reject(`exec error: ${error}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            return resolve(stdout);
        });
    });
};

const RETRIEVE_AN_ARTIFACT = (action) => {
    return new Promise((resolve, reject) => {
        const execString = `curl -u ${action.params.AUTH} -L "${action.params.ARTIFACT_PATH}" -o ${action.params.DESTINATION_PATH}`;
        child_process.exec(execString, (error, stdout, stderr) => {
            if (error) {
                reject(`exec error: ${error}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            return resolve(stdout);
        });
    });
};

const DELETE_FROM_BINTRAY = (action) => {
    return new Promise((resolve, reject) => {
        const execString = `curl -u ${action.params.AUTH} -X ${actions.params.DELETE}`;
        child_process.exec(execString, (error, stdout, stderr) => {
            if (error) {
                reject(`exec error: ${error}`);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
            }
            return resolve(stdout);
        });
    });
};


module.exports = {
    DEPLOY_AN_ARTIFACT,
    RETRIEVE_AN_ARTIFACT,
    DELETE_FROM_BINTRAY
};
