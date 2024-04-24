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
import { playRawAudio } from './browser_fft_utils';
import { concatenateFloat32Arrays } from './generic_utils';
import { FFT_TYPE, SpeechCommandRecognizer, SpeechCommandRecognizerMetadata } from './types';
import { normalizeFloat32Array, normalize } from './browser_fft_utils';
/**
 * Create an instance of speech-command recognizer.
 *
 * @param fftType Type of FFT. The currently availble option(s):
 *   - BROWSER_FFT: Obtains audio spectrograms using browser's native Fourier
 *     transform.
 * @param vocabulary The vocabulary of the model to load. Possible options:
 *   - '18w' (default): The 18-word vocaulbary, consisting of:
 *     'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
 *     'eight', 'nine', 'up', 'down', 'left', 'right', 'go', 'stop',
 *     'yes', and 'no', in addition to '_background_noise_' and '_unknown_'.
 *   - 'directional4w': The four directional words: 'up', 'down', 'left', and
 *     'right', in addition to '_background_noise_' and '_unknown_'.
 *   Choosing a smaller vocabulary leads to better accuracy on the words of
 *   interest and a slightly smaller model size.
 * @param customModelArtifactsOrURL A custom model URL pointing to a model.json
 *     file, or a set of modelArtifacts in `tf.io.ModelArtifacts` format.
 *   Supported schemes: http://, https://, and node.js-only: file://.
 *   Mutually exclusive with `vocabulary`. If provided, `customMetadatURL`
 *   most also be provided.
 * @param customMetadataOrURL A custom metadata URL pointing to a metadata.json
 *   file. Must be provided together with `customModelURL`, or a metadata
 *   object.
 * @returns An instance of SpeechCommandRecognizer.
 * @throws Error on invalid value of `fftType`.
 */
export declare function create(fftType: FFT_TYPE, vocabulary?: string, customModelArtifactsOrURL?: tf.io.ModelArtifacts | string, customMetadataOrURL?: SpeechCommandRecognizerMetadata | string): SpeechCommandRecognizer;
declare const utils: {
    concatenateFloat32Arrays: typeof concatenateFloat32Arrays;
    normalizeFloat32Array: typeof normalizeFloat32Array;
    normalize: typeof normalize;
    playRawAudio: typeof playRawAudio;
};
export { BACKGROUND_NOISE_TAG, Dataset, GetDataConfig as GetSpectrogramsAsTensorsConfig, getMaxIntensityFrameIndex, spectrogram2IntensityCurve, SpectrogramAndTargetsTfDataset } from './dataset';
export { AudioDataAugmentationOptions, Example, FFT_TYPE, RawAudioData, RecognizerParams, SpectrogramData, SpeechCommandRecognizer, SpeechCommandRecognizerMetadata, SpeechCommandRecognizerResult, StreamingRecognitionConfig, TransferLearnConfig, TransferSpeechCommandRecognizer } from './types';
export { deleteSavedTransferModel, listSavedTransferModels, UNKNOWN_TAG } from './browser_fft_recognizer';
export { utils };
export { version } from './version';
