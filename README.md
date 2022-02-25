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

# AWS

## S3
https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html#step1-create-bucket-config-as-website

## Cloudfront
- https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/
