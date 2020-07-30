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
import { V1alpha1HelmFileParameter } from './v1alpha1HelmFileParameter';
import { V1alpha1HelmParameter } from './v1alpha1HelmParameter';

export class V1alpha1ApplicationSourceHelm {
    'fileParameters'?: Array<V1alpha1HelmFileParameter>;
    'parameters'?: Array<V1alpha1HelmParameter>;
    'releaseName'?: string;
    'valueFiles'?: Array<string>;
    'values'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "fileParameters",
            "baseName": "fileParameters",
            "type": "Array<V1alpha1HelmFileParameter>"
        },
        {
            "name": "parameters",
            "baseName": "parameters",
            "type": "Array<V1alpha1HelmParameter>"
        },
        {
            "name": "releaseName",
            "baseName": "releaseName",
            "type": "string"
        },
        {
            "name": "valueFiles",
            "baseName": "valueFiles",
            "type": "Array<string>"
        },
        {
            "name": "values",
            "baseName": "values",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1ApplicationSourceHelm.attributeTypeMap;
    }
}
