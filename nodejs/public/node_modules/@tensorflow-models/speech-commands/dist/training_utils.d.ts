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
/**
 * Utility functions for training and transfer learning of the speech-commands
 * model.
 */
import * as tf from '@tensorflow/tfjs-core';
/**
 * Split feature and target tensors into train and validation (val) splits.
 *
 * Given sufficent number of examples, the train and val sets will be
 * balanced with respect to the classes.
 *
 * @param xs Features tensor, of shape [numExamples, ...].
 * @param ys Targets tensors, of shape [numExamples, numClasses]. Assumed to be
 *   one-hot categorical encoding.
 * @param valSplit A number > 0 and < 1, fraction of examples to use
 *   as the validation set.
 * @returns trainXs: training features tensor; trainYs: training targets
 *   tensor; valXs: validation features tensor; valYs: validation targets
 *   tensor.
 */
export declare function balancedTrainValSplit(xs: tf.Tensor, ys: tf.Tensor, valSplit: number): {
    trainXs: tf.Tensor;
    trainYs: tf.Tensor;
    valXs: tf.Tensor;
    valYs: tf.Tensor;
};
/**
 * Same as balancedTrainValSplit, but for number arrays or Float32Arrays.
 */
export declare function balancedTrainValSplitNumArrays(xs: number[][] | Float32Array[], ys: number[], valSplit: number): {
    trainXs: number[][] | Float32Array[];
    trainYs: number[];
    valXs: number[][] | Float32Array[];
    valYs: number[];
};
