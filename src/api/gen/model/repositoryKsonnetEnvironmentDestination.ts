/**
 * Consolidate Services
 * Description of all APIs
 *
 * The version of the OpenAPI document: version not set
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from '../api';

export class RepositoryKsonnetEnvironmentDestination {
    'namespace'?: string;
    /**
    * Server is the Kubernetes server that the cluster is running on.
    */
    'server'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "namespace",
            "baseName": "namespace",
            "type": "string"
        },
        {
            "name": "server",
            "baseName": "server",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return RepositoryKsonnetEnvironmentDestination.attributeTypeMap;
    }
}
