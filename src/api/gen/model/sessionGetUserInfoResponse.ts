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

export class SessionGetUserInfoResponse {
    'groups'?: Array<string>;
    'iss'?: string;
    'loggedIn'?: boolean;
    'username'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "groups",
            "baseName": "groups",
            "type": "Array<string>"
        },
        {
            "name": "iss",
            "baseName": "iss",
            "type": "string"
        },
        {
            "name": "loggedIn",
            "baseName": "loggedIn",
            "type": "boolean"
        },
        {
            "name": "username",
            "baseName": "username",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return SessionGetUserInfoResponse.attributeTypeMap;
    }
}

