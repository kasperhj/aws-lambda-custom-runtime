import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import { Construct, Stack, StackProps, Tags } from '@aws-cdk/core';
import path from 'path';

export class CustomRuntimeCdkStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        // Create the execution role required for the lambda
        const executionRole = new iam.Role(this, 'ExecutionRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName(
                'service-role/AWSLambdaBasicExecutionRole'
                )
            ],
            })

        const node16Layer = new lambda.LayerVersion(this, 'Node16Layer', {
            code: lambda.Code.fromAsset(path.join(__dirname, '../../node-v16.14.2-runtime-layer.zip')),
            compatibleRuntimes: [lambda.Runtime.PROVIDED]
        });

        new lambda.Function(this, 'Lambda', {
            memorySize: 128,
            runtime: lambda.Runtime.PROVIDED,
            code: lambda.Code.fromAsset(path.join(__dirname, '../../dist')),
            handler: 'lambda.handler',
            layers: [node16Layer],
            role: executionRole
        });
    }
}