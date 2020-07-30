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

export class V1alpha1OperationInitiator {
    /**
    * Automated is set to true if operation was initiated automatically by the application controller.
    */
    'automated'?: boolean;
    /**
    * Name of a user who started operation.
    */
    'username'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "automated",
            "baseName": "automated",
            "type": "boolean"
        },
        {
            "name": "username",
            "baseName": "username",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1OperationInitiator.attributeTypeMap;
    }
}
