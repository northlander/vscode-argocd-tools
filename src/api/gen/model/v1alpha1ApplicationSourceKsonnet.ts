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
import { V1alpha1KsonnetParameter } from './v1alpha1KsonnetParameter';

export class V1alpha1ApplicationSourceKsonnet {
    'environment'?: string;
    'parameters'?: Array<V1alpha1KsonnetParameter>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "environment",
            "baseName": "environment",
            "type": "string"
        },
        {
            "name": "parameters",
            "baseName": "parameters",
            "type": "Array<V1alpha1KsonnetParameter>"
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1ApplicationSourceKsonnet.attributeTypeMap;
    }
}

