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
var browser_fft_recognizer_1 = require("./browser_fft_recognizer");
var browser_fft_utils_1 = require("./browser_fft_utils");
var generic_utils_1 = require("./generic_utils");
var browser_fft_utils_2 = require("./browser_fft_utils");
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
function create(fftType, vocabulary, customModelArtifactsOrURL, customMetadataOrURL) {
    tf.util.assert(customModelArtifactsOrURL == null && customMetadataOrURL == null ||
        customModelArtifactsOrURL != null && customMetadataOrURL != null, function () { return "customModelURL and customMetadataURL must be both provided or " +
        "both not provided."; });
    if (customModelArtifactsOrURL != null) {
        tf.util.assert(vocabulary == null, function () { return "vocabulary name must be null or undefined when modelURL " +
            "is provided."; });
    }
    if (fftType === 'BROWSER_FFT') {
        return new browser_fft_recognizer_1.BrowserFftSpeechCommandRecognizer(vocabulary, customModelArtifactsOrURL, customMetadataOrURL);
    }
    else if (fftType === 'SOFT_FFT') {
        throw new Error('SOFT_FFT SpeechCommandRecognizer has not been implemented yet.');
    }
    else {
        throw new Error("Invalid fftType: '" + fftType + "'");
    }
}
exports.create = create;
var utils = {
    concatenateFloat32Arrays: generic_utils_1.concatenateFloat32Arrays,
    normalizeFloat32Array: browser_fft_utils_2.normalizeFloat32Array,
    normalize: browser_fft_utils_2.normalize,
    playRawAudio: browser_fft_utils_1.playRawAudio
};
exports.utils = utils;
var dataset_1 = require("./dataset");
exports.BACKGROUND_NOISE_TAG = dataset_1.BACKGROUND_NOISE_TAG;
exports.Dataset = dataset_1.Dataset;
exports.getMaxIntensityFrameIndex = dataset_1.getMaxIntensityFrameIndex;
exports.spectrogram2IntensityCurve = dataset_1.spectrogram2IntensityCurve;
var browser_fft_recognizer_2 = require("./browser_fft_recognizer");
exports.deleteSavedTransferModel = browser_fft_recognizer_2.deleteSavedTransferModel;
exports.listSavedTransferModels = browser_fft_recognizer_2.listSavedTransferModels;
exports.UNKNOWN_TAG = browser_fft_recognizer_2.UNKNOWN_TAG;
var version_1 = require("./version");
exports.version = version_1.version;
//# sourceMappingURL=index.js.map