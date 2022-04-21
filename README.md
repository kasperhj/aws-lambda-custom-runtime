# What is this?
If you're not happy with the runtimes already provided out of the box by AWS, you can create your own custom runtime and put it in a Lambda Layer, making it shareable across severals Lambdas.

This project serves as a reference example of how to setup a custom AWS Lambda runtime as a Lambda Layer with CDK using TypeScript.

In the example we will be using nodejs v16 as the runtime.

# How to run

## Requirements
You need to have
* an AWS account
* a default AWS profile (`aws configure`) with sufficient rights to create resources
* Docker installed on your machine
## Steps

1. Go to `cdk/bin/custom-runtime-cdk-app.ts` and add your account and region.
1. `npm run build`
1. `npm run deploy`
1. Invoke the lambda function (e.g. through the AWS console) and it will return 
```
{
  "statusCode": 200,
  "nodeVersion": "v16.14.2"
}
```
You might need to run `cdk bootstrap` if step 3 fails.

# How it works
An [older post from Amazon](https://aws.amazon.com/blogs/apn/aws-lambda-custom-runtime-for-php-a-practical-example/) walks you through the process, but in summary you have to create an executable file named `bootstrap` that the AWS Lambda environment will execute when the function is invoked.

`bootstrap` must meet the requirements [specified by the AWS Lambda runtime API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html), and will execute the lambda handler specified in the CDK in the context of what itself runs in, in our case node16.

In this example I'm using Docker to create a Lambda Layer containing the custom runtime.
The `custom-runtime/Dockerfile` contains the details, but in essence we grab the node executable from nodejs.org, put it in a `bin` folder and then zip it along with a `bootstrap`, and copy the resulting zip-file to the Docker host (i.e. your machine).

The content of the zip-file looks like this:

```
├─📂 bin
│ └─📜 node
└─📜 bootstrap
```

The zip-file is referenced in the [cdk stack definition](cdk/lib/custom-runtime-cdk-stack.ts), and used to create a layer that a Lambda can use.

The `bootstrap`-file in this example is taken from [LambCI](https://github.com/lambci/node-custom-lambda) and implements the Lambda runtime API in javascript.
I have only added a shebang.

You could rename `bootstrap` to `bootstrap.js` (remove the shebang) and then create a `bootstrap` with the following
```bash
#!/bin/sh

set -e

while true
do
    /opt/bin/node "/opt/bootstrap.js" 2>&1
done
```

The layer is put in the `opt` directory by AWS, so we need to include that.