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


## Parameters

| Name                           | Required  | Default Value | Description                                           |
|--------------------------------|-----------|---------------|-------------------------------------------------------|
| token                 | Yes |  | PAT Token for access    |
| run-id                      | No |  | Used for extracting the deployment review comments  not related to current run              |

## Output
comments - Single ouput defined as an array with following structure
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
