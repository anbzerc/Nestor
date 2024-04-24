"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_core_1 = require("@tensorflow/tfjs-core");
function expectTensorsClose(actual, expected, epsilon) {
    if (actual == null) {
        throw new Error('First argument to expectTensorsClose() is not defined.');
    }
    if (expected == null) {
        throw new Error('Second argument to expectTensorsClose() is not defined.');
    }
    if (actual instanceof tfjs_core_1.Tensor && expected instanceof tfjs_core_1.Tensor) {
        if (actual.dtype !== expected.dtype) {
            throw new Error("Data types do not match. Actual: '" + actual.dtype + "'. " +
                ("Expected: '" + expected.dtype + "'"));
        }
        if (!tfjs_core_1.util.arraysEqual(actual.shape, expected.shape)) {
            throw new Error("Shapes do not match. Actual: [" + actual.shape + "]. " +
                ("Expected: [" + expected.shape + "]."));
        }
    }
    var actualData = actual instanceof tfjs_core_1.Tensor ? actual.dataSync() : actual;
    var expectedData = expected instanceof tfjs_core_1.Tensor ? expected.dataSync() : expected;
    tfjs_core_1.test_util.expectArraysClose(actualData, expectedData, epsilon);
}
exports.expectTensorsClose = expectTensorsClose;
//# sourceMappingURL=test_utils.js.map