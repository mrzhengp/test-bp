import { Construct } from 'constructs';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { KubevelaAddon } from '../addons/kubevela';
import { GlobalResources } from '@aws-quickstart/eks-blueprints';

export default class HybridCluster {
    static build(scope: Construct) {
        blueprints.EksBlueprint.builder()
            .version("auto")
            .resourceProvider(GlobalResources.Vpc, new blueprints.VpcProvider(undefined, {primaryCidr: "10.10.0.0/16"}))
            .addOns(
                new blueprints.AwsLoadBalancerControllerAddOn,
                new blueprints.VpcCniAddOn, 
                new blueprints.MetricsServerAddOn,
                new blueprints.ClusterAutoScalerAddOn,
                new KubevelaAddon()
            )
            .build(scope, "hybrid-cluster");
    }
}