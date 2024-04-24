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
import * as tfl from '@tensorflow/tfjs-layers';
import { BrowserFftFeatureExtractor } from './browser_fft_extractor';
import { RecognizeConfig, RecognizerCallback, RecognizerParams, SpeechCommandRecognizer, SpeechCommandRecognizerMetadata, SpeechCommandRecognizerResult, StreamingRecognitionConfig, TransferSpeechCommandRecognizer } from './types';
export declare const UNKNOWN_TAG = "_unknown_";
export declare const SAVED_MODEL_METADATA_KEY = "tfjs-speech-commands-saved-model-metadata";
export declare const SAVE_PATH_PREFIX = "indexeddb://tfjs-speech-commands-model/";
export declare let localStorageWrapper: {
    localStorage: Storage;
};
export declare function getMajorAndMinorVersion(version: string): string;
/**
 * Speech-Command Recognizer using browser-native (WebAudio) spectral featutres.
 */
export declare class BrowserFftSpeechCommandRecognizer implements SpeechCommandRecognizer {
    static readonly VALID_VOCABULARY_NAMES: string[];
    static readonly DEFAULT_VOCABULARY_NAME = "18w";
    readonly MODEL_URL_PREFIX: string;
    private readonly SAMPLE_RATE_HZ;
    private readonly FFT_SIZE;
    private readonly DEFAULT_SUPPRESSION_TIME_MILLIS;
    model: tfl.LayersModel;
    modelWithEmbeddingOutput: tfl.LayersModel;
    readonly vocabulary: string;
    readonly parameters: RecognizerParams;
    protected words: string[];
    protected streaming: boolean;
    protected nonBatchInputShape: [number, number, number];
    private elementsPerExample;
    protected audioDataExtractor: BrowserFftFeatureExtractor;
    private transferRecognizers;
    private modelArtifactsOrURL;
    private metadataOrURL;
    protected secondLastBaseDenseLayer: tfl.layers.Layer;
    /**
     * Constructor of BrowserFftSpeechCommandRecognizer.
     *
     * @param vocabulary An optional vocabulary specifier. Mutually exclusive
     *   with `modelURL` and `metadataURL`.
     * @param modelArtifactsOrURL An optional, custom model URL pointing to a
     *     model.json, or modelArtifacts in the format of `tf.io.ModelArtifacts`.
     *   file. Supported schemes: http://, https://, and node.js-only: file://.
     *   Mutually exclusive with `vocabulary`. If provided, `metadatURL`
     *   most also be provided.
     * @param metadataOrURL A custom metadata URL pointing to a metadata.json
     *   file. Or it can be a metadata JSON object itself. Must be provided
     *   together with `modelArtifactsOrURL`.
     */
    constructor(vocabulary?: string, modelArtifactsOrURL?: tf.io.ModelArtifacts | string, metadataOrURL?: SpeechCommandRecognizerMetadata | string);
    /**
     * Start streaming recognition.
     *
     * To stop the recognition, use `stopListening()`.
     *
     * Example: TODO(cais): Add exapmle code snippet.
     *
     * @param callback The callback invoked whenever a word is recognized
     *   with a probability score greater than `config.probabilityThreshold`.
     *   It has the signature:
     *     (result: SpeechCommandRecognizerResult) => Promise<void>
     *   wherein result has the two fields:
     *   - scores: A Float32Array that contains the probability scores for all
     *     the words.
     *   - spectrogram: The spectrogram data, provided only if
     *     `config.includeSpectrogram` is `true`.
     * @param config The configurations for the streaming recognition to
     *   be started.
     *   The `modelName` field of `config` specifies the model to be used for
     *   online recognition. If not specified, it defaults to the name of the
     *   base model ('base'), i.e., the pretrained model not from transfer
     *   learning. If the recognizer instance has one or more transfer-learning
     *   models ready (as a result of calls to `collectTransferExample`
     *   and `trainTransferModel`), you can let this call use that
     *   model for prediction by specifying the corresponding `modelName`.
     * @throws Error, if streaming recognition is already started or
     *   if `config` contains invalid values.
     */
    listen(callback: RecognizerCallback, config?: StreamingRecognitionConfig): Promise<void>;
    /**
     * Load the underlying tf.LayersModel instance and associated metadata.
     *
     * If the model and the metadata are already loaded, do nothing.
     */
    ensureModelLoaded(): Promise<void>;
    /**
     * Construct a two-output model that includes the following outputs:
     *
     * 1. The same softmax probability output as the original model's output
     * 2. The embedding, i.e., activation from the second-last dense layer of
     *    the original model.
     */
    protected ensureModelWithEmbeddingOutputCreated(): Promise<void>;
    private warmUpModel;
    private ensureMetadataLoaded;
    /**
     * Stop streaming recognition.
     *
     * @throws Error if there is not ongoing streaming recognition.
     */
    stopListening(): Promise<void>;
    /**
     * Check if streaming recognition is ongoing.
     */
    isListening(): boolean;
    /**
     * Get the array of word labels.
     *
     * @throws Error If this model is called before the model is loaded.
     */
    wordLabels(): string[];
    /**
     * Get the parameters of this instance of BrowserFftSpeechCommandRecognizer.
     *
     * @returns Parameters of this instance.
     */
    params(): RecognizerParams;
    /**
     * Get the input shape of the underlying tf.LayersModel.
     *
     * @returns The input shape.
     */
    modelInputShape(): tfl.Shape;
    /**
     * Run offline (non-streaming) recognition on a spectrogram.
     *
     * @param input Spectrogram. Either a `tf.Tensor` of a `Float32Array`.
     *   - If a `tf.Tensor`, must be rank-4 and match the model's expected
     *     input shape in 2nd dimension (# of spectrogram columns), the 3rd
     *     dimension (# of frequency-domain points per column), and the 4th
     *     dimension (always 1). The 1st dimension can be 1, for single-example
     *     recogntion, or any value >1, for batched recognition.
     *   - If a `Float32Array`, must have a length divisible by the number
     *     of elements per spectrogram, i.e.,
     *     (# of spectrogram columns) * (# of frequency-domain points per column).
     * @param config Optional configuration object.
     * @returns Result of the recognition, with the following field:
     *   scores:
     *   - A `Float32Array` if there is only one input exapmle.
     *   - An `Array` of `Float32Array`, if there are multiple input examples.
     */
    recognize(input?: tf.Tensor | Float32Array, config?: RecognizeConfig): Promise<SpeechCommandRecognizerResult>;
    private recognizeOnline;
    createTransfer(name: string): TransferSpeechCommandRecognizer;
    protected freezeModel(): void;
    private checkInputTensorShape;
}
/**
 * List the model that are currently saved locally in the browser.
 *
 * @returns An array of transfer-learned speech-commands models
 *   that are currently saved in the browser locally.
 */
export declare function listSavedTransferModels(): Promise<string[]>;
/**
 * Delete a locally-saved, transfer-learned speech-commands model.
 *
 * @param name The name of the transfer-learned model to be deleted.
 */
export declare function deleteSavedTransferModel(name: string): Promise<void>;
