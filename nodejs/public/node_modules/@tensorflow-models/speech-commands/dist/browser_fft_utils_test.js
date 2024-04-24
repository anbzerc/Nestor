"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
var tf = require("@tensorflow/tfjs-core");
var browser_fft_utils_1 = require("./browser_fft_utils");
var test_utils_1 = require("./test_utils");
describe('normalize', function () {
    it('Non-constant value; no memory leak', function () {
        var x = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
        var numTensors0 = tf.memory().numTensors;
        var y = browser_fft_utils_1.normalize(x);
        // Assert no memory leak.
        expect(tf.memory().numTensors).toEqual(numTensors0 + 1);
        test_utils_1.expectTensorsClose(y, tf.tensor4d([-1.3416406, -0.4472135, 0.4472135, 1.3416406], [1, 2, 2, 1]));
        var _a = tf.moments(y), mean = _a.mean, variance = _a.variance;
        test_utils_1.expectTensorsClose(mean, tf.scalar(0));
        test_utils_1.expectTensorsClose(variance, tf.scalar(1));
    });
    it('Constant value', function () {
        var x = tf.tensor4d([42, 42, 42, 42], [1, 2, 2, 1]);
        var y = browser_fft_utils_1.normalize(x);
        test_utils_1.expectTensorsClose(y, tf.tensor4d([0, 0, 0, 0], [1, 2, 2, 1]));
    });
});
describe('normalizeFloat32Array', function () {
    it('Length-4 input', function () {
        var xs = new Float32Array([1, 2, 3, 4]);
        var numTensors0 = tf.memory().numTensors;
        var ys = tf.tensor1d(browser_fft_utils_1.normalizeFloat32Array(xs));
        // Assert no memory leak. (The extra comes from the tf.tensor1d() call
        // in the testing code.)
        expect(tf.memory().numTensors).toEqual(numTensors0 + 1);
        test_utils_1.expectTensorsClose(ys, tf.tensor1d([-1.3416406, -0.4472135, 0.4472135, 1.3416406]));
    });
});
//# sourceMappingURL=browser_fft_utils_test.js.map