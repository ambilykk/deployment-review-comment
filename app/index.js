// libraries for github actions
const core = require('@actions/core');

// get the input value run-id
const run_id = core.getInput('run-id');

// if run_id is not provided, use the current run id
run_id = run_id ? run_id : github.context.runId;

// define output array
const commentsRes = [];

// get the Review data for the run
const run_data = await github.rest.actions.getReviewsForRun({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: run_id
})

// for multiple comments
for (const data of run_data.data) {
    console.log(data.comment);
    commentsRes.push(data);
}

// set the output value
core.setOutput(comments, commentsRes);
console.log(commentsRes);

// console the completion message
console.log("Completed");