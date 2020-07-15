/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

/**
 * The Apl Component definition with full information
 */
export interface IAplComponent {
    /**
     * the component object
     */
    jsonObject : object;

    /**
     * APL Component type. For Customized Component, it is undefined
     */
    componentType : string | undefined;

    /**
     * Component root parent for mixin
     */
    parentComponent : object;

    /**
     * Component root parent type for mixin
     */
    parentComponentType : string;

    /**
     * Component JSON_PATH
     */
    jsonPath : string;
}
