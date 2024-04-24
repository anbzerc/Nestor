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
import * as tf from '@tensorflow/tfjs-core';
import { RawAudioData } from './types';
export declare function loadMetadataJson(url: string): Promise<{
    wordLabels: string[];
}>;
/**
 * Normalize the input into zero mean and unit standard deviation.
 *
 * This function is safe against divison-by-zero: In case the standard
 * deviation is zero, the output will be all-zero.
 *
 * @param x Input tensor.
 * @param y Output normalized tensor.
 */
export declare function normalize(x: tf.Tensor): tf.Tensor;
/**
 * Z-Normalize the elements of a Float32Array.
 *
 * Subtract the mean and divide the result by the standard deviation.
 *
 * @param x The Float32Array to normalize.
 * @return Noramlzied Float32Array.
 */
export declare function normalizeFloat32Array(x: Float32Array): Float32Array;
export declare function getAudioContextConstructor(): AudioContext;
export declare function getAudioMediaStream(audioTrackConstraints?: MediaTrackConstraints): Promise<MediaStream>;
/**
 * Play raw audio waveform
 * @param rawAudio Raw audio data, including the waveform and the sampling rate.
 * @param onEnded Callback function to execute when the playing ends.
 */
export declare function playRawAudio(rawAudio: RawAudioData, onEnded: () => void | Promise<void>): void;
