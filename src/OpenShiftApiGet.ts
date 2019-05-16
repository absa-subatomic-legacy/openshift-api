import * as winston from "winston";
import {OpenShiftApiElement} from "./base/OpenShiftApiElement";
import {OpenshiftApiResult} from "./base/OpenshiftApiResult";
import {ResourceFactory} from "./resources/ResourceFactory";
import {ResourceUrl} from "./resources/ResourceUrl";

export class OpenShiftApiGet extends OpenShiftApiElement {

    public async get(resourceKind: string, resourceName: string, namespace: string = "default", apiVersion: string = "v1"): Promise<OpenshiftApiResult> {
        const resourceDefinition = ResourceFactory.baseResource(resourceKind, apiVersion);
        resourceDefinition.metadata.name = resourceName;
        const instance = this.getAxiosInstanceForResource(resourceDefinition);
        const url = ResourceUrl.getNamedResourceUrl(resourceDefinition, namespace);
        winston.createLogger().info(`Trying to get resource ${url}`);
        return await instance.get(url);
    }

    public async getAllFromNamespace(resourceKind: string, namespace: string = "default", apiVersion: string = "v1"): Promise<OpenshiftApiResult> {
        const resourceDefinition = ResourceFactory.baseResource(resourceKind, apiVersion);
        const instance = this.getAxiosInstanceForResource(resourceDefinition);
        const url = ResourceUrl.getResourceKindUrl(resourceDefinition, namespace);
        winston.createLogger().info(`Trying to get resource ${url}`);
        return await instance.get(url);
    }

}
