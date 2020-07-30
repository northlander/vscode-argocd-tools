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
import { V1alpha1ConnectionState } from './v1alpha1ConnectionState';

export class V1alpha1Repository {
    'connectionState'?: V1alpha1ConnectionState;
    'enableLfs'?: boolean;
    'inheritedCreds'?: boolean;
    'insecure'?: boolean;
    'insecureIgnoreHostKey'?: boolean;
    'name'?: string;
    'password'?: string;
    'repo'?: string;
    'sshPrivateKey'?: string;
    'tlsClientCertData'?: string;
    'tlsClientCertKey'?: string;
    'type'?: string;
    'username'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "connectionState",
            "baseName": "connectionState",
            "type": "V1alpha1ConnectionState"
        },
        {
            "name": "enableLfs",
            "baseName": "enableLfs",
            "type": "boolean"
        },
        {
            "name": "inheritedCreds",
            "baseName": "inheritedCreds",
            "type": "boolean"
        },
        {
            "name": "insecure",
            "baseName": "insecure",
            "type": "boolean"
        },
        {
            "name": "insecureIgnoreHostKey",
            "baseName": "insecureIgnoreHostKey",
            "type": "boolean"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "password",
            "baseName": "password",
            "type": "string"
        },
        {
            "name": "repo",
            "baseName": "repo",
            "type": "string"
        },
        {
            "name": "sshPrivateKey",
            "baseName": "sshPrivateKey",
            "type": "string"
        },
        {
            "name": "tlsClientCertData",
            "baseName": "tlsClientCertData",
            "type": "string"
        },
        {
            "name": "tlsClientCertKey",
            "baseName": "tlsClientCertKey",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        },
        {
            "name": "username",
            "baseName": "username",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1Repository.attributeTypeMap;
    }
}
