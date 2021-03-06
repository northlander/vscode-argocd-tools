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
import { V1LoadBalancerIngress } from './v1LoadBalancerIngress';
import { V1alpha1ResourceRef } from './v1alpha1ResourceRef';

export class V1alpha1ResourceNetworkingInfo {
    /**
    * ExternalURLs holds list of URLs which should be available externally. List is populated for ingress resources using rules hostnames.
    */
    'externalURLs'?: Array<string>;
    'ingress'?: Array<V1LoadBalancerIngress>;
    'labels'?: { [key: string]: string; };
    'targetLabels'?: { [key: string]: string; };
    'targetRefs'?: Array<V1alpha1ResourceRef>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "externalURLs",
            "baseName": "externalURLs",
            "type": "Array<string>"
        },
        {
            "name": "ingress",
            "baseName": "ingress",
            "type": "Array<V1LoadBalancerIngress>"
        },
        {
            "name": "labels",
            "baseName": "labels",
            "type": "{ [key: string]: string; }"
        },
        {
            "name": "targetLabels",
            "baseName": "targetLabels",
            "type": "{ [key: string]: string; }"
        },
        {
            "name": "targetRefs",
            "baseName": "targetRefs",
            "type": "Array<V1alpha1ResourceRef>"
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1ResourceNetworkingInfo.attributeTypeMap;
    }
}

