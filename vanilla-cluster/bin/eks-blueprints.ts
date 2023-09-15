import * as cdk from 'aws-cdk-lib';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { GlobalResources } from '@aws-quickstart/eks-blueprints';
// import { EksBlueprintsStack } from '../lib/eks-blueprints-stack';
// import { CfnParameter } from 'aws-cdk-lib';

const app = new cdk.App();
const version = 'auto';
// const account = '575066549800';
// const region = 'ap-northeast-2';
// const myVpcId = 'vpc-044a3ea719fe021bf';
// const clusterVpcId = clusterVpcId.valueAsString;

const addOns: Array<blueprints.ClusterAddOn> = [
    // new blueprints.addons.MetricsServerAddOn(),
    // new blueprints.addons.ClusterAutoScalerAddOn(),
    // new blueprints.addons.AwsLoadBalancerControllerAddOn(),
    // new blueprints.addons.VpcCniAddOn(),
    // new blueprints.addons.ArgoCDAddOn(),
    // new blueprints.addons.CalicoOperatorAddOn(),
    // new blueprints.addons.CoreDnsAddOn(),
    // new blueprints.addons.KubeProxyAddOn()
];

const clusterVpcId = process.env.CLUSTER_VPC_ID as string;

// const clusterVpcId = new CfnParameter(app, "clusterVpcId", {
//     type: "String",
//     description: "The VPC ID of the VPC that this cluster will be deployed into."
// });

// const nonProdAccountId = new StringParameter.fromStringParameterName(
//     this, "nonProdAccountId", nonProdAccountIdParamName).stringValue;

// const clusterName = new CfnParameter(app, "clusterName", {
//     type: "String",
//     description: "The name of the cluster."});

// const vpcStack = new VPCStack(app, 'eks-blueprint-vpc', { env: { account, region } });

// const vpc = new ec2.Vpc(app, 'TheVPC', {
//     ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
// })

const stack = blueprints.EksBlueprint.builder()
    .resourceProvider(GlobalResources.Vpc, new blueprints.VpcProvider(clusterVpcId))
    // .resourceProvider(GlobalResources.Vpc, new blueprints.DirectVpcProvider(vpcStack.vpc))
    // .resourceProvider(GlobalResources.Vpc, new blueprints.VpcProvider(vpcStack.vpc.vpcId))
    // .resourceProvider(GlobalResources.Vpc, new blueprints.VpcProvider(undefined, {primaryCidr: "10.20.0.0/16"}))
    .version(version)
    .addOns(...addOns)
    .useDefaultSecretEncryption(false) // set to false to turn secret encryption off (non-production/demo cases)
    // .build(app, clusterName.valueAsString);
    .build(app, 'dev-cluster');