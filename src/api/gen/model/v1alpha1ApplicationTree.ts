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
import { V1alpha1ResourceNode } from './v1alpha1ResourceNode';

export class V1alpha1ApplicationTree {
    /**
    * Nodes contains list of nodes which either directly managed by the application and children of directly managed nodes.
    */
    'nodes'?: Array<V1alpha1ResourceNode>;
    /**
    * OrphanedNodes contains if or orphaned nodes: nodes which are not managed by the app but in the same namespace. List is populated only if orphaned resources enabled in app project.
    */
    'orphanedNodes'?: Array<V1alpha1ResourceNode>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "nodes",
            "baseName": "nodes",
            "type": "Array<V1alpha1ResourceNode>"
        },
        {
            "name": "orphanedNodes",
            "baseName": "orphanedNodes",
            "type": "Array<V1alpha1ResourceNode>"
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1ApplicationTree.attributeTypeMap;
    }
}

