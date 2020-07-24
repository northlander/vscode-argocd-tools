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

export interface ClusterOIDCConfig {
    cliClientID?: string;

    clientID?: string;

    idTokenClaims?: { [key: string]: models.OidcClaim; };

    issuer?: string;

    name?: string;

    scopes?: Array<string>;

}