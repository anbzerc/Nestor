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
require("@tensorflow/tfjs-node");
var tf = require("@tensorflow/tfjs-core");
var jasmine_util_1 = require("@tensorflow/tfjs-core/dist/jasmine_util");
var test_utils_1 = require("./test_utils");
var training_utils_1 = require("./training_utils");
jasmine_util_1.describeWithFlags('balancedTrainValSplit', jasmine_util_1.NODE_ENVS, function () {
    it('Enough data for split', function () {
        var xs = tf.randomNormal([8, 3]);
        var ys = tf.oneHot(tf.tensor1d([0, 0, 0, 0, 1, 1, 1, 1], 'int32'), 2);
        var _a = training_utils_1.balancedTrainValSplit(xs, ys, 0.25), trainXs = _a.trainXs, trainYs = _a.trainYs, valXs = _a.valXs, valYs = _a.valYs;
        expect(trainXs.shape).toEqual([6, 3]);
        expect(trainYs.shape).toEqual([6, 2]);
        expect(valXs.shape).toEqual([2, 3]);
        expect(valYs.shape).toEqual([2, 2]);
        test_utils_1.expectTensorsClose(tf.sum(trainYs, 0), tf.tensor1d([3, 3], 'int32'));
        test_utils_1.expectTensorsClose(tf.sum(valYs, 0), tf.tensor1d([1, 1], 'int32'));
    });
    it('Not enough data for split', function () {
        var xs = tf.randomNormal([8, 3]);
        var ys = tf.oneHot(tf.tensor1d([0, 0, 0, 0, 1, 1, 1, 1], 'int32'), 2);
        var _a = training_utils_1.balancedTrainValSplit(xs, ys, 0.01), trainXs = _a.trainXs, trainYs = _a.trainYs, valXs = _a.valXs, valYs = _a.valYs;
        expect(trainXs.shape).toEqual([8, 3]);
        expect(trainYs.shape).toEqual([8, 2]);
        expect(valXs.shape).toEqual([0, 3]);
        expect(valYs.shape).toEqual([0, 2]);
    });
    it('Invalid valSplit leads to Error', function () {
        var xs = tf.randomNormal([8, 3]);
        var ys = tf.oneHot(tf.tensor1d([0, 0, 0, 0, 1, 1, 1, 1], 'int32'), 2);
        expect(function () { return training_utils_1.balancedTrainValSplit(xs, ys, -0.2); }).toThrow();
        expect(function () { return training_utils_1.balancedTrainValSplit(xs, ys, 0); }).toThrow();
        expect(function () { return training_utils_1.balancedTrainValSplit(xs, ys, 1); }).toThrow();
        expect(function () { return training_utils_1.balancedTrainValSplit(xs, ys, 1.2); }).toThrow();
    });
});
//# sourceMappingURL=training_utils_test.js.map