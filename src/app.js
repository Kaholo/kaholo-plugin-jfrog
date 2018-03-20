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


const functions = {
    DEPLOY_AN_ARTIFACT,
    RETRIEVE_AN_ARTIFACT,
    DELETE_FROM_BINTRAY
};

function main(argv) {
    if (argv.length < 3) {
        console.log('{err: "not enough parameters"}');
        // Invalid Argument
        // Either an unknown option was specified, or an option requiring a value was provided without a value.
        process.exit(9);
    }
    let action = JSON.parse(argv[2]);
    functions[action.method.name](action)
        .then(res => {
            console.log(res);
            process.exit(0); // Success
        }).catch(err => {
        console.log("an error occurred", err);
        // Uncaught Fatal Exception
        // There was an uncaught exception, and it was not handled by a domain or an 'uncaughtException' event handler.
        process.exit(1);
    });
}

main(process.argv);
