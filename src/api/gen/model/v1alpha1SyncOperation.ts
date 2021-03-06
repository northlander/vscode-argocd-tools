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
import { V1alpha1ApplicationSource } from './v1alpha1ApplicationSource';
import { V1alpha1SyncOperationResource } from './v1alpha1SyncOperationResource';
import { V1alpha1SyncStrategy } from './v1alpha1SyncStrategy';

/**
* SyncOperation contains sync operation details.
*/
export class V1alpha1SyncOperation {
    'dryRun'?: boolean;
    'manifests'?: Array<string>;
    'prune'?: boolean;
    'resources'?: Array<V1alpha1SyncOperationResource>;
    /**
    * Revision is the revision in which to sync the application to. If omitted, will use the revision specified in app spec.
    */
    'revision'?: string;
    'source'?: V1alpha1ApplicationSource;
    'syncOptions'?: Array<string>;
    'syncStrategy'?: V1alpha1SyncStrategy;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "dryRun",
            "baseName": "dryRun",
            "type": "boolean"
        },
        {
            "name": "manifests",
            "baseName": "manifests",
            "type": "Array<string>"
        },
        {
            "name": "prune",
            "baseName": "prune",
            "type": "boolean"
        },
        {
            "name": "resources",
            "baseName": "resources",
            "type": "Array<V1alpha1SyncOperationResource>"
        },
        {
            "name": "revision",
            "baseName": "revision",
            "type": "string"
        },
        {
            "name": "source",
            "baseName": "source",
            "type": "V1alpha1ApplicationSource"
        },
        {
            "name": "syncOptions",
            "baseName": "syncOptions",
            "type": "Array<string>"
        },
        {
            "name": "syncStrategy",
            "baseName": "syncStrategy",
            "type": "V1alpha1SyncStrategy"
        }    ];

    static getAttributeTypeMap() {
        return V1alpha1SyncOperation.attributeTypeMap;
    }
}

