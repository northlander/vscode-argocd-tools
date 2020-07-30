#!/bin/sh
# Generate API Spec for correct JSON (de-)serialization of ArgoCD objects.
# Spec is generated in api/gen folder.

SWAGGER_VERSION=v1.6.1
SWAGGER_URL=https://raw.githubusercontent.com/argoproj/argo-cd/${SWAGGER_VERSION}/assets/swagger.json
rm -rf ./gen
mkdir gen
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli generate -i ${SWAGGER_URL} -g typescript-node --global-property models -o /local/gen
# Quick fix since model generation require a module named api with RequestFile, but not used.
echo "export const RequestFile = {};" > gen/api.ts