# Build Process

1. Install Node and NPM
2. run `npm install`
3. run `npm run build`
4. take dist/<application> folder, upload to s3

# Automated
1. Download and Install AWS CLI
2. use `aws configure` to add AWS Access Key ID AND AWS Secret Access Key TO YOUR MACHINE.

// Clean Up
`aws s3 rm s3://ortf-request-form --recursive`
// with profile:
`aws s3 rm s3://ortf-request-form --recursive --profile ortf`

// Push New objects
`aws s3 cp dist/ortf-home s3://ortf-request-form --recursive`
// with profile:
`aws s3 cp dist/ortf-home s3://ortf-request-form --recursive --profile ortf`
