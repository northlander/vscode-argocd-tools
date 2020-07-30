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
import { V1ManagedFieldsEntry } from './v1ManagedFieldsEntry';
import { V1OwnerReference } from './v1OwnerReference';
import { V1Time } from './v1Time';

/**
* ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.
*/
export class V1ObjectMeta {
    'annotations'?: { [key: string]: string; };
    'clusterName'?: string;
    'creationTimestamp'?: V1Time;
    'deletionGracePeriodSeconds'?: string;
    'deletionTimestamp'?: V1Time;
    'finalizers'?: Array<string>;
    /**
    * GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.  If this field is specified and the generated name exists, the server will NOT return a 409 - instead, it will either return 201 Created or 500 with Reason ServerTimeout indicating a unique name could not be found in the time allotted, and the client should retry (optionally after the time indicated in the Retry-After header).  Applied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency +optional
    */
    'generateName'?: string;
    'generation'?: string;
    'labels'?: { [key: string]: string; };
    /**
    * ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn\'t need to set or understand this field. A workflow can be the user\'s name, a controller\'s name, or the name of a specific apply path like \"ci-cd\". The set of fields is always in the version that the workflow used when modifying the object.  +optional
    */
    'managedFields'?: Array<V1ManagedFieldsEntry>;
    'name'?: string;
    /**
    * Namespace defines the space within each name must be unique. An empty namespace is equivalent to the \"default\" namespace, but \"default\" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.  Must be a DNS_LABEL. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/namespaces +optional
    */
    'namespace'?: string;
    'ownerReferences'?: Array<V1OwnerReference>;
    /**
    * An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.  Populated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency +optional
    */
    'resourceVersion'?: string;
    /**
    * SelfLink is a URL representing this object. Populated by the system. Read-only.  DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release. +optional
    */
    'selfLink'?: string;
    /**
    * UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.  Populated by the system. Read-only. More info: http://kubernetes.io/docs/user-guide/identifiers#uids +optional
    */
    'uid'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "annotations",
            "baseName": "annotations",
            "type": "{ [key: string]: string; }"
        },
        {
            "name": "clusterName",
            "baseName": "clusterName",
            "type": "string"
        },
        {
            "name": "creationTimestamp",
            "baseName": "creationTimestamp",
            "type": "V1Time"
        },
        {
            "name": "deletionGracePeriodSeconds",
            "baseName": "deletionGracePeriodSeconds",
            "type": "string"
        },
        {
            "name": "deletionTimestamp",
            "baseName": "deletionTimestamp",
            "type": "V1Time"
        },
        {
            "name": "finalizers",
            "baseName": "finalizers",
            "type": "Array<string>"
        },
        {
            "name": "generateName",
            "baseName": "generateName",
            "type": "string"
        },
        {
            "name": "generation",
            "baseName": "generation",
            "type": "string"
        },
        {
            "name": "labels",
            "baseName": "labels",
            "type": "{ [key: string]: string; }"
        },
        {
            "name": "managedFields",
            "baseName": "managedFields",
            "type": "Array<V1ManagedFieldsEntry>"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "namespace",
            "baseName": "namespace",
            "type": "string"
        },
        {
            "name": "ownerReferences",
            "baseName": "ownerReferences",
            "type": "Array<V1OwnerReference>"
        },
        {
            "name": "resourceVersion",
            "baseName": "resourceVersion",
            "type": "string"
        },
        {
            "name": "selfLink",
            "baseName": "selfLink",
            "type": "string"
        },
        {
            "name": "uid",
            "baseName": "uid",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return V1ObjectMeta.attributeTypeMap;
    }
}
