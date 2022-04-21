#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CustomRuntimeCdkStack } from '../lib/custom-runtime-cdk-stack';

const app = new cdk.App();
new CustomRuntimeCdkStack(app, 'CustomRuntimeApp', {
    env: {
        account: '000000000000',
        region: 'eu-central-1'
    }
});