// libraries for github actions
const core = require('@actions/core');
const github = require('@actions/github');

// get the input value run-id
let run_id = core.getInput('run-id');

// get the input value token
const token = core.getInput('token');

// create an instace of octokit
const octokit = github.getOctokit(token);

// if run_id is not provided, use the current run id
run_id = run_id ? run_id : github.context.runId;

// define the run function
async function run() {
    // define output array
    const commentsRes = [];

    // octokit getreviewsforrun method execution
    const run_data = await octokit.rest.actions.getReviewsForRun({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        run_id: run_id
    })

    // for multiple comments
    for (const data of run_data.data) {
        console.log(data.comment);
        let env = '';
        data.environments.forEach(element => {
            env = env + element + ' ';
            console.log(element);
            element.forEach(ele => {
                console.log(ele);
            })
        });

        commentsRes.push({
            user: data.user.login,
            comment: data.comment,
            state: data.state,
            envitonment: env
        });
    }

    // set the output value
    core.setOutput('comments', commentsRes);
    console.log(commentsRes);

    // console the completion message
    console.log("Completed");
}

// executing the run function
run();
