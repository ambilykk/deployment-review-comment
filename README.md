# Deployment Review Comment
Extract the deployment review comment specified as part of Manual approval/rejection of a workflow execution

# How to Use the Action

## action in workflow

Include the deployment-review-comment action in your workflow. 

1: Pass the GITHUB_TOKEN

```
- name: Testing deployment review comment action
        id: review
        uses: ambilykk/deployment-review-comment@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: display output
        uses: actions/github-script@v6
        with:
          script: |
            for(const data of ${{ steps.review.outputs.comments}}){
              console.log(data)
            }

```

2. Output generated

Below screenshot shows the execution of the action after two deployment reviews - one for the environment **'dev'** and another for the environment **'test'**. Deployment *approved* for the **'test'** environment and *rejected* for the **'dev'** environment

![Screenshot 2022-12-28 at 12 58 50 PM](https://user-images.githubusercontent.com/10282550/209775205-47184599-a18d-4b6e-ae8a-2d7a2d05b69e.png)


## Parameters

| Name                           | Required  | Input/Output | Description                                           |
|--------------------------------|-----------|---------------|-------------------------------------------------------|
| token                 | Yes | Input | PAT Token for access    |
| run-id                      | No | Input | Used for extracting the deployment review comments  not related to current run              |
| comments                     |  | Output | Array of deployment review details. Review the **Output** section for the structure |

## Output
**comments** - ouput defined as an array with following structure

```
[
    {
        user: 'user who approved/rejected',
        comment: 'comment as part of the review',
        state: 'approved/rejected',
        envitonment: 'environment name'
    }
]
```

# License

The scripts and documentation in this project are released under the [MIT License](./LICENSE)
