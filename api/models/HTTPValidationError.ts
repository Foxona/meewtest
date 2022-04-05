/**
 * some api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { ValidationError } from './ValidationError';
import { HttpFile } from '../http/http';

export class HTTPValidationError {
    'detail'?: Array<ValidationError>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "detail",
            "baseName": "detail",
            "type": "Array<ValidationError>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return HTTPValidationError.attributeTypeMap;
    }

    public constructor() {
    }
}

