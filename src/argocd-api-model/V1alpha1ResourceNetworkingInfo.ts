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

export interface V1alpha1ResourceNetworkingInfo {
    /**
     * ExternalURLs holds list of URLs which should be available externally. List is populated for ingress resources using rules hostnames.
     */
    externalURLs?: Array<string>;

    ingress?: Array<models.V1LoadBalancerIngress>;

    labels?: { [key: string]: string; };

    targetLabels?: { [key: string]: string; };

    targetRefs?: Array<models.V1alpha1ResourceRef>;

}