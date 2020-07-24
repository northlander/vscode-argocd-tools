/**
 * Consolidate Services
 * Description of all APIs
 *
 * OpenAPI spec version: version not set
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

/**
 * SyncStatus is a comparison result of application spec and deployed application.
 */
export interface V1alpha1SyncStatus {
    comparedTo?: models.V1alpha1ComparedTo;

    revision?: string;

    status?: string;

}