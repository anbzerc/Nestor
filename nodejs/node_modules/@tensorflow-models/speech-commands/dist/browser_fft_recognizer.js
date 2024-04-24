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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
var tfl = require("@tensorflow/tfjs-layers");
var browser_fft_extractor_1 = require("./browser_fft_extractor");
var browser_fft_utils_1 = require("./browser_fft_utils");
var dataset_1 = require("./dataset");
var generic_utils_1 = require("./generic_utils");
var training_utils_1 = require("./training_utils");
var version_1 = require("./version");
exports.UNKNOWN_TAG = '_unknown_';
// Key to the local-storage item that holds a map from model name to word
// list.
exports.SAVED_MODEL_METADATA_KEY = 'tfjs-speech-commands-saved-model-metadata';
exports.SAVE_PATH_PREFIX = 'indexeddb://tfjs-speech-commands-model/';
// Export a variable for injection during unit testing.
// tslint:disable-next-line:no-any
exports.localStorageWrapper = {
    localStorage: typeof window === 'undefined' ? null : window.localStorage
};
function getMajorAndMinorVersion(version) {
    var versionItems = version.split('.');
    return versionItems.slice(0, 2).join('.');
}
exports.getMajorAndMinorVersion = getMajorAndMinorVersion;
/**
 * Default window hop ratio used for extracting multiple
 * windows from a long spectrogram.
 */
var DEFAULT_WINDOW_HOP_RATIO = 0.25;
/**
 * Speech-Command Recognizer using browser-native (WebAudio) spectral featutres.
 */
var BrowserFftSpeechCommandRecognizer = /** @class */ (function () {
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
    function BrowserFftSpeechCommandRecognizer(vocabulary, modelArtifactsOrURL, metadataOrURL) {
        this.MODEL_URL_PREFIX = "https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v" + getMajorAndMinorVersion(version_1.version) + "/browser_fft";
        this.SAMPLE_RATE_HZ = 44100;
        this.FFT_SIZE = 1024;
        this.DEFAULT_SUPPRESSION_TIME_MILLIS = 0;
        this.streaming = false;
        this.transferRecognizers = {};
        // TODO(cais): Consolidate the fields into a single config object when
        // upgrading to v1.0.
        tf.util.assert(modelArtifactsOrURL == null && metadataOrURL == null ||
            modelArtifactsOrURL != null && metadataOrURL != null, function () { return "modelURL and metadataURL must be both provided or " +
            "both not provided."; });
        if (modelArtifactsOrURL == null) {
            if (vocabulary == null) {
                vocabulary = BrowserFftSpeechCommandRecognizer.DEFAULT_VOCABULARY_NAME;
            }
            else {
                tf.util.assert(BrowserFftSpeechCommandRecognizer.VALID_VOCABULARY_NAMES.indexOf(vocabulary) !== -1, function () { return "Invalid vocabulary name: '" + vocabulary + "'"; });
            }
            this.vocabulary = vocabulary;
            this.modelArtifactsOrURL =
                this.MODEL_URL_PREFIX + "/" + this.vocabulary + "/model.json";
            this.metadataOrURL =
                this.MODEL_URL_PREFIX + "/" + this.vocabulary + "/metadata.json";
        }
        else {
            tf.util.assert(vocabulary == null, function () { return "vocabulary name must be null or undefined when modelURL is " +
                "provided"; });
            this.modelArtifactsOrURL = modelArtifactsOrURL;
            this.metadataOrURL = metadataOrURL;
        }
        this.parameters = {
            sampleRateHz: this.SAMPLE_RATE_HZ,
            fftSize: this.FFT_SIZE
        };
    }
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
    BrowserFftSpeechCommandRecognizer.prototype.listen = function (callback, config) {
        return __awaiter(this, void 0, void 0, function () {
            var probabilityThreshold, invokeCallbackOnNoiseAndUnknown, overlapFactor, spectrogramCallback, suppressionTimeMillis;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.streaming) {
                            throw new Error('Cannot start streaming again when streaming is ongoing.');
                        }
                        return [4 /*yield*/, this.ensureModelLoaded()];
                    case 1:
                        _a.sent();
                        if (config == null) {
                            config = {};
                        }
                        probabilityThreshold = config.probabilityThreshold == null ? 0 : config.probabilityThreshold;
                        if (config.includeEmbedding) {
                            // Override probability threshold to 0 if includeEmbedding is true.
                            probabilityThreshold = 0;
                        }
                        tf.util.assert(probabilityThreshold >= 0 && probabilityThreshold <= 1, function () { return "Invalid probabilityThreshold value: " + probabilityThreshold; });
                        invokeCallbackOnNoiseAndUnknown = config.invokeCallbackOnNoiseAndUnknown == null ?
                            false :
                            config.invokeCallbackOnNoiseAndUnknown;
                        if (config.includeEmbedding) {
                            // Override invokeCallbackOnNoiseAndUnknown threshold to true if
                            // includeEmbedding is true.
                            invokeCallbackOnNoiseAndUnknown = true;
                        }
                        if (config.suppressionTimeMillis < 0) {
                            throw new Error("suppressionTimeMillis is expected to be >= 0, " +
                                ("but got " + config.suppressionTimeMillis));
                        }
                        overlapFactor = config.overlapFactor == null ? 0.5 : config.overlapFactor;
                        tf.util.assert(overlapFactor >= 0 && overlapFactor < 1, function () { return "Expected overlapFactor to be >= 0 and < 1, but got " + overlapFactor; });
                        spectrogramCallback = function (x, timeData) { return __awaiter(_this, void 0, void 0, function () {
                            var normalizedX, y, embedding, scores, maxIndexTensor, maxIndex, maxScore, spectrogram, _a, wordDetected;
                            var _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        normalizedX = browser_fft_utils_1.normalize(x);
                                        if (!config.includeEmbedding) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.ensureModelWithEmbeddingOutputCreated()];
                                    case 1:
                                        _c.sent();
                                        _b = __read(this.modelWithEmbeddingOutput.predict(normalizedX), 2), y = _b[0], embedding = _b[1];
                                        return [3 /*break*/, 3];
                                    case 2:
                                        y = this.model.predict(normalizedX);
                                        _c.label = 3;
                                    case 3: return [4 /*yield*/, y.data()];
                                    case 4:
                                        scores = _c.sent();
                                        maxIndexTensor = y.argMax(-1);
                                        return [4 /*yield*/, maxIndexTensor.data()];
                                    case 5:
                                        maxIndex = (_c.sent())[0];
                                        maxScore = Math.max.apply(Math, __spread(scores));
                                        tf.dispose([y, maxIndexTensor, normalizedX]);
                                        if (!(maxScore < probabilityThreshold)) return [3 /*break*/, 6];
                                        return [2 /*return*/, false];
                                    case 6:
                                        spectrogram = undefined;
                                        if (!config.includeSpectrogram) return [3 /*break*/, 8];
                                        _a = {};
                                        return [4 /*yield*/, x.data()];
                                    case 7:
                                        spectrogram = (_a.data = (_c.sent()),
                                            _a.frameSize = this.nonBatchInputShape[1],
                                            _a);
                                        _c.label = 8;
                                    case 8:
                                        wordDetected = true;
                                        if (!invokeCallbackOnNoiseAndUnknown) {
                                            // Skip background noise and unknown tokens.
                                            if (this.words[maxIndex] === dataset_1.BACKGROUND_NOISE_TAG ||
                                                this.words[maxIndex] === exports.UNKNOWN_TAG) {
                                                wordDetected = false;
                                            }
                                        }
                                        if (wordDetected) {
                                            callback({ scores: scores, spectrogram: spectrogram, embedding: embedding });
                                        }
                                        // Trigger suppression only if the word is neither unknown or
                                        // background noise.
                                        return [2 /*return*/, wordDetected];
                                }
                            });
                        }); };
                        suppressionTimeMillis = config.suppressionTimeMillis == null ?
                            this.DEFAULT_SUPPRESSION_TIME_MILLIS :
                            config.suppressionTimeMillis;
                        this.audioDataExtractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
                            sampleRateHz: this.parameters.sampleRateHz,
                            numFramesPerSpectrogram: this.nonBatchInputShape[0],
                            columnTruncateLength: this.nonBatchInputShape[1],
                            suppressionTimeMillis: suppressionTimeMillis,
                            spectrogramCallback: spectrogramCallback,
                            overlapFactor: overlapFactor
                        });
                        return [4 /*yield*/, this.audioDataExtractor.start(config.audioTrackConstraints)];
                    case 2:
                        _a.sent();
                        this.streaming = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Load the underlying tf.LayersModel instance and associated metadata.
     *
     * If the model and the metadata are already loaded, do nothing.
     */
    BrowserFftSpeechCommandRecognizer.prototype.ensureModelLoaded = function () {
        return __awaiter(this, void 0, void 0, function () {
            var model, outputShape, frameDurationMillis, numFrames;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.model != null) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.ensureMetadataLoaded()];
                    case 1:
                        _a.sent();
                        if (!(typeof this.modelArtifactsOrURL === 'string')) return [3 /*break*/, 3];
                        return [4 /*yield*/, tfl.loadLayersModel(this.modelArtifactsOrURL)];
                    case 2:
                        model = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, tfl.loadLayersModel(tf.io.fromMemory(this.modelArtifactsOrURL.modelTopology, this.modelArtifactsOrURL.weightSpecs, this.modelArtifactsOrURL.weightData))];
                    case 4:
                        // this.modelArtifactsOrURL is an instance of `tf.io.ModelArtifacts`.
                        model = _a.sent();
                        _a.label = 5;
                    case 5:
                        // Check the validity of the model's input shape.
                        if (model.inputs.length !== 1) {
                            throw new Error("Expected model to have 1 input, but got a model with " +
                                (model.inputs.length + " inputs"));
                        }
                        if (model.inputs[0].shape.length !== 4) {
                            throw new Error("Expected model to have an input shape of rank 4, " +
                                ("but got an input shape of rank " + model.inputs[0].shape.length));
                        }
                        if (model.inputs[0].shape[3] !== 1) {
                            throw new Error("Expected model to have an input shape with 1 as the last " +
                                "dimension, but got input shape" +
                                (JSON.stringify(model.inputs[0].shape[3]) + "}"));
                        }
                        outputShape = model.outputShape;
                        if (outputShape.length !== 2) {
                            throw new Error("Expected loaded model to have an output shape of rank 2," +
                                ("but received shape " + JSON.stringify(outputShape)));
                        }
                        if (outputShape[1] !== this.words.length) {
                            throw new Error("Mismatch between the last dimension of model's output shape " +
                                ("(" + outputShape[1] + ") and number of words ") +
                                ("(" + this.words.length + ")."));
                        }
                        this.model = model;
                        this.freezeModel();
                        this.nonBatchInputShape =
                            model.inputs[0].shape.slice(1);
                        this.elementsPerExample = 1;
                        model.inputs[0].shape.slice(1).forEach(function (dimSize) { return _this.elementsPerExample *= dimSize; });
                        this.warmUpModel();
                        frameDurationMillis = this.parameters.fftSize / this.parameters.sampleRateHz * 1e3;
                        numFrames = model.inputs[0].shape[1];
                        this.parameters.spectrogramDurationMillis = numFrames * frameDurationMillis;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Construct a two-output model that includes the following outputs:
     *
     * 1. The same softmax probability output as the original model's output
     * 2. The embedding, i.e., activation from the second-last dense layer of
     *    the original model.
     */
    BrowserFftSpeechCommandRecognizer.prototype.ensureModelWithEmbeddingOutputCreated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var secondLastDenseLayer, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.modelWithEmbeddingOutput != null) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.ensureModelLoaded()];
                    case 1:
                        _a.sent();
                        for (i = this.model.layers.length - 2; i >= 0; --i) {
                            if (this.model.layers[i].getClassName() === 'Dense') {
                                secondLastDenseLayer = this.model.layers[i];
                                break;
                            }
                        }
                        if (secondLastDenseLayer == null) {
                            throw new Error('Failed to find second last dense layer in the original model.');
                        }
                        this.modelWithEmbeddingOutput = tfl.model({
                            inputs: this.model.inputs,
                            outputs: [
                                this.model.outputs[0], secondLastDenseLayer.output
                            ]
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BrowserFftSpeechCommandRecognizer.prototype.warmUpModel = function () {
        var _this = this;
        tf.tidy(function () {
            var x = tf.zeros([1].concat(_this.nonBatchInputShape));
            for (var i = 0; i < 3; ++i) {
                _this.model.predict(x);
            }
        });
    };
    BrowserFftSpeechCommandRecognizer.prototype.ensureMetadataLoaded = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metadataJSON, _a, legacyWords;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.words != null) {
                            return [2 /*return*/];
                        }
                        if (!(typeof this.metadataOrURL === 'string')) return [3 /*break*/, 2];
                        return [4 /*yield*/, browser_fft_utils_1.loadMetadataJson(this.metadataOrURL)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = this.metadataOrURL;
                        _b.label = 3;
                    case 3:
                        metadataJSON = _a;
                        if (metadataJSON.wordLabels == null) {
                            legacyWords = metadataJSON['words'];
                            if (legacyWords == null) {
                                throw new Error('Cannot find field "words" or "wordLabels" in metadata JSON file');
                            }
                            this.words = legacyWords;
                        }
                        else {
                            this.words = metadataJSON.wordLabels;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Stop streaming recognition.
     *
     * @throws Error if there is not ongoing streaming recognition.
     */
    BrowserFftSpeechCommandRecognizer.prototype.stopListening = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.streaming) {
                            throw new Error('Cannot stop streaming when streaming is not ongoing.');
                        }
                        return [4 /*yield*/, this.audioDataExtractor.stop()];
                    case 1:
                        _a.sent();
                        this.streaming = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check if streaming recognition is ongoing.
     */
    BrowserFftSpeechCommandRecognizer.prototype.isListening = function () {
        return this.streaming;
    };
    /**
     * Get the array of word labels.
     *
     * @throws Error If this model is called before the model is loaded.
     */
    BrowserFftSpeechCommandRecognizer.prototype.wordLabels = function () {
        return this.words;
    };
    /**
     * Get the parameters of this instance of BrowserFftSpeechCommandRecognizer.
     *
     * @returns Parameters of this instance.
     */
    BrowserFftSpeechCommandRecognizer.prototype.params = function () {
        return this.parameters;
    };
    /**
     * Get the input shape of the underlying tf.LayersModel.
     *
     * @returns The input shape.
     */
    BrowserFftSpeechCommandRecognizer.prototype.modelInputShape = function () {
        if (this.model == null) {
            throw new Error('Model has not been loaded yet. Load model by calling ' +
                'ensureModelLoaded(), recognize(), or listen().');
        }
        return this.model.inputs[0].shape;
    };
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
    BrowserFftSpeechCommandRecognizer.prototype.recognize = function (input, config) {
        return __awaiter(this, void 0, void 0, function () {
            var spectrogramData, numExamples, inputTensor, outTensor, output, outAndEmbedding, _a, unstacked, scorePromises, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (config == null) {
                            config = {};
                        }
                        return [4 /*yield*/, this.ensureModelLoaded()];
                    case 1:
                        _f.sent();
                        if (!(input == null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.recognizeOnline()];
                    case 2:
                        spectrogramData = _f.sent();
                        input = spectrogramData.data;
                        _f.label = 3;
                    case 3:
                        if (input instanceof tf.Tensor) {
                            // Check input shape.
                            this.checkInputTensorShape(input);
                            inputTensor = input;
                            numExamples = input.shape[0];
                        }
                        else {
                            if (input.length % this.elementsPerExample) {
                                throw new Error("The length of the input Float32Array " + input.length + " " +
                                    "is not divisible by the number of tensor elements per " +
                                    ("per example expected by the model " + this.elementsPerExample + "."));
                            }
                            numExamples = input.length / this.elementsPerExample;
                            inputTensor = tf.tensor4d(input, [
                                numExamples
                            ].concat(this.nonBatchInputShape));
                        }
                        output = { scores: null };
                        if (!config.includeEmbedding) return [3 /*break*/, 5];
                        // Optional inclusion of embedding (internal activation).
                        return [4 /*yield*/, this.ensureModelWithEmbeddingOutputCreated()];
                    case 4:
                        // Optional inclusion of embedding (internal activation).
                        _f.sent();
                        outAndEmbedding = this.modelWithEmbeddingOutput.predict(inputTensor);
                        outTensor = outAndEmbedding[0];
                        output.embedding = outAndEmbedding[1];
                        return [3 /*break*/, 6];
                    case 5:
                        outTensor = this.model.predict(inputTensor);
                        _f.label = 6;
                    case 6:
                        if (!(numExamples === 1)) return [3 /*break*/, 8];
                        _a = output;
                        return [4 /*yield*/, outTensor.data()];
                    case 7:
                        _a.scores = (_f.sent());
                        return [3 /*break*/, 10];
                    case 8:
                        unstacked = tf.unstack(outTensor);
                        scorePromises = unstacked.map(function (item) { return item.data(); });
                        _b = output;
                        return [4 /*yield*/, Promise.all(scorePromises)];
                    case 9:
                        _b.scores = (_f.sent());
                        tf.dispose(unstacked);
                        _f.label = 10;
                    case 10:
                        if (!config.includeSpectrogram) return [3 /*break*/, 14];
                        _c = output;
                        _d = {};
                        if (!(input instanceof tf.Tensor)) return [3 /*break*/, 12];
                        return [4 /*yield*/, input.data()];
                    case 11:
                        _e = _f.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        _e = input;
                        _f.label = 13;
                    case 13:
                        _c.spectrogram = (_d.data = (_e),
                            _d.frameSize = this.nonBatchInputShape[1],
                            _d);
                        _f.label = 14;
                    case 14:
                        tf.dispose(outTensor);
                        return [2 /*return*/, output];
                }
            });
        });
    };
    BrowserFftSpeechCommandRecognizer.prototype.recognizeOnline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var spectrogramCallback = function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var normalizedX, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        normalizedX = browser_fft_utils_1.normalize(x);
                                        return [4 /*yield*/, this.audioDataExtractor.stop()];
                                    case 1:
                                        _c.sent();
                                        _a = resolve;
                                        _b = {};
                                        return [4 /*yield*/, normalizedX.data()];
                                    case 2:
                                        _a.apply(void 0, [(_b.data = (_c.sent()),
                                                _b.frameSize = this.nonBatchInputShape[1],
                                                _b)]);
                                        normalizedX.dispose();
                                        return [2 /*return*/, false];
                                }
                            });
                        }); };
                        _this.audioDataExtractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
                            sampleRateHz: _this.parameters.sampleRateHz,
                            numFramesPerSpectrogram: _this.nonBatchInputShape[0],
                            columnTruncateLength: _this.nonBatchInputShape[1],
                            suppressionTimeMillis: 0,
                            spectrogramCallback: spectrogramCallback,
                            overlapFactor: 0
                        });
                        _this.audioDataExtractor.start();
                    })];
            });
        });
    };
    BrowserFftSpeechCommandRecognizer.prototype.createTransfer = function (name) {
        if (this.model == null) {
            throw new Error('Model has not been loaded yet. Load model by calling ' +
                'ensureModelLoaded(), recognizer(), or listen().');
        }
        tf.util.assert(name != null && typeof name === 'string' && name.length > 1, function () { return "Expected the name for a transfer-learning recognized to be a " +
            ("non-empty string, but got " + JSON.stringify(name)); });
        tf.util.assert(this.transferRecognizers[name] == null, function () { return "There is already a transfer-learning model named '" + name + "'"; });
        var transfer = new TransferBrowserFftSpeechCommandRecognizer(name, this.parameters, this.model);
        this.transferRecognizers[name] = transfer;
        return transfer;
    };
    BrowserFftSpeechCommandRecognizer.prototype.freezeModel = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.model.layers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var layer = _c.value;
                layer.trainable = false;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    BrowserFftSpeechCommandRecognizer.prototype.checkInputTensorShape = function (input) {
        var expectedRank = this.model.inputs[0].shape.length;
        if (input.shape.length !== expectedRank) {
            throw new Error("Expected input Tensor to have rank " + expectedRank + ", " +
                ("but got rank " + input.shape.length + " that differs "));
        }
        var nonBatchedShape = input.shape.slice(1);
        var expectedNonBatchShape = this.model.inputs[0].shape.slice(1);
        if (!tf.util.arraysEqual(nonBatchedShape, expectedNonBatchShape)) {
            throw new Error("Expected input to have shape [null," + expectedNonBatchShape + "], " +
                ("but got shape [null," + nonBatchedShape + "]"));
        }
    };
    BrowserFftSpeechCommandRecognizer.VALID_VOCABULARY_NAMES = ['18w', 'directional4w'];
    BrowserFftSpeechCommandRecognizer.DEFAULT_VOCABULARY_NAME = '18w';
    return BrowserFftSpeechCommandRecognizer;
}());
exports.BrowserFftSpeechCommandRecognizer = BrowserFftSpeechCommandRecognizer;
/**
 * A subclass of BrowserFftSpeechCommandRecognizer: Transfer-learned model.
 */
var TransferBrowserFftSpeechCommandRecognizer = /** @class */ (function (_super) {
    __extends(TransferBrowserFftSpeechCommandRecognizer, _super);
    /**
     * Constructor of TransferBrowserFftSpeechCommandRecognizer.
     *
     * @param name Name of the transfer-learned recognizer. Must be a non-empty
     *   string.
     * @param parameters Parameters from the base recognizer.
     * @param baseModel Model from the base recognizer.
     */
    function TransferBrowserFftSpeechCommandRecognizer(name, parameters, baseModel) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.parameters = parameters;
        _this.baseModel = baseModel;
        tf.util.assert(name != null && typeof name === 'string' && name.length > 0, function () { return "The name of a transfer model must be a non-empty string, " +
            ("but got " + JSON.stringify(name)); });
        _this.nonBatchInputShape =
            _this.baseModel.inputs[0].shape.slice(1);
        _this.words = null;
        _this.dataset = new dataset_1.Dataset();
        return _this;
    }
    /**
     * Collect an example for transfer learning via WebAudio.
     *
     * @param {string} word Name of the word. Must not overlap with any of the
     *   words the base model is trained to recognize.
     * @param {ExampleCollectionOptions}
     * @returns {SpectrogramData} The spectrogram of the acquired the example.
     * @throws Error, if word belongs to the set of words the base model is
     *   trained to recognize.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.collectExample = function (word, options) {
        return __awaiter(this, void 0, void 0, function () {
            var numFramesPerSpectrogram, frameDurationSec_1, frameDurationSec, totalDurationSec;
            var _this = this;
            return __generator(this, function (_a) {
                tf.util.assert(!this.streaming, function () { return 'Cannot start collection of transfer-learning example because ' +
                    'a streaming recognition or transfer-learning example collection ' +
                    'is ongoing'; });
                tf.util.assert(word != null && typeof word === 'string' && word.length > 0, function () { return "Must provide a non-empty string when collecting transfer-" +
                    "learning example"; });
                if (options == null) {
                    options = {};
                }
                if (options.durationMultiplier != null && options.durationSec != null) {
                    throw new Error("durationMultiplier and durationSec are mutually exclusive, " +
                        "but are both specified.");
                }
                if (options.durationSec != null) {
                    tf.util.assert(options.durationSec > 0, function () {
                        return "Expected durationSec to be > 0, but got " + options.durationSec;
                    });
                    frameDurationSec_1 = this.parameters.fftSize / this.parameters.sampleRateHz;
                    numFramesPerSpectrogram =
                        Math.ceil(options.durationSec / frameDurationSec_1);
                }
                else if (options.durationMultiplier != null) {
                    tf.util.assert(options.durationMultiplier >= 1, function () { return "Expected duration multiplier to be >= 1, " +
                        ("but got " + options.durationMultiplier); });
                    numFramesPerSpectrogram =
                        Math.round(this.nonBatchInputShape[0] * options.durationMultiplier);
                }
                else {
                    numFramesPerSpectrogram = this.nonBatchInputShape[0];
                }
                if (options.snippetDurationSec != null) {
                    tf.util.assert(options.snippetDurationSec > 0, function () { return "snippetDurationSec is expected to be > 0, but got " +
                        ("" + options.snippetDurationSec); });
                    tf.util.assert(options.onSnippet != null, function () { return "onSnippet must be provided if snippetDurationSec " +
                        "is provided."; });
                }
                if (options.onSnippet != null) {
                    tf.util.assert(options.snippetDurationSec != null, function () { return "snippetDurationSec must be provided if onSnippet " +
                        "is provided."; });
                }
                frameDurationSec = this.parameters.fftSize / this.parameters.sampleRateHz;
                totalDurationSec = frameDurationSec * numFramesPerSpectrogram;
                this.streaming = true;
                return [2 /*return*/, new Promise(function (resolve) {
                        var stepFactor = options.snippetDurationSec == null ?
                            1 :
                            options.snippetDurationSec / totalDurationSec;
                        var overlapFactor = 1 - stepFactor;
                        var callbackCountTarget = Math.round(1 / stepFactor);
                        var callbackCount = 0;
                        var lastIndex = -1;
                        var spectrogramSnippets = [];
                        var spectrogramCallback = function (freqData, timeData) { return __awaiter(_this, void 0, void 0, function () {
                            var normalizedX, _a, _b, _c, _d, _e, _f, _g, _h, data, i, increment, snippetData, normalized, finalSpectrogram, _j, _k, _l, _m, _o;
                            return __generator(this, function (_p) {
                                switch (_p.label) {
                                    case 0:
                                        if (!(options.onSnippet == null)) return [3 /*break*/, 7];
                                        normalizedX = browser_fft_utils_1.normalize(freqData);
                                        _b = (_a = this.dataset).addExample;
                                        _c = {
                                            label: word
                                        };
                                        _d = {};
                                        return [4 /*yield*/, normalizedX.data()];
                                    case 1:
                                        _c.spectrogram = (_d.data = (_p.sent()),
                                            _d.frameSize = this.nonBatchInputShape[1],
                                            _d);
                                        if (!options.includeRawAudio) return [3 /*break*/, 3];
                                        _f = {};
                                        return [4 /*yield*/, timeData.data()];
                                    case 2:
                                        _e = (_f.data = (_p.sent()),
                                            _f.sampleRateHz = this.audioDataExtractor.sampleRateHz,
                                            _f);
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _e = undefined;
                                        _p.label = 4;
                                    case 4:
                                        _b.apply(_a, [(_c.rawAudio = _e,
                                                _c)]);
                                        normalizedX.dispose();
                                        return [4 /*yield*/, this.audioDataExtractor.stop()];
                                    case 5:
                                        _p.sent();
                                        this.streaming = false;
                                        this.collateTransferWords();
                                        _g = resolve;
                                        _h = {};
                                        return [4 /*yield*/, freqData.data()];
                                    case 6:
                                        _g.apply(void 0, [(_h.data = (_p.sent()),
                                                _h.frameSize = this.nonBatchInputShape[1],
                                                _h)]);
                                        return [3 /*break*/, 13];
                                    case 7: return [4 /*yield*/, freqData.data()];
                                    case 8:
                                        data = _p.sent();
                                        if (lastIndex === -1) {
                                            lastIndex = data.length;
                                        }
                                        i = lastIndex - 1;
                                        while (data[i] !== 0 && i >= 0) {
                                            i--;
                                        }
                                        increment = lastIndex - i - 1;
                                        lastIndex = i + 1;
                                        snippetData = data.slice(data.length - increment, data.length);
                                        spectrogramSnippets.push(snippetData);
                                        if (options.onSnippet != null) {
                                            options.onSnippet({ data: snippetData, frameSize: this.nonBatchInputShape[1] });
                                        }
                                        if (!(callbackCount++ === callbackCountTarget)) return [3 /*break*/, 13];
                                        return [4 /*yield*/, this.audioDataExtractor.stop()];
                                    case 9:
                                        _p.sent();
                                        this.streaming = false;
                                        this.collateTransferWords();
                                        normalized = browser_fft_utils_1.normalizeFloat32Array(generic_utils_1.concatenateFloat32Arrays(spectrogramSnippets));
                                        finalSpectrogram = {
                                            data: normalized,
                                            frameSize: this.nonBatchInputShape[1]
                                        };
                                        _k = (_j = this.dataset).addExample;
                                        _l = {
                                            label: word,
                                            spectrogram: finalSpectrogram
                                        };
                                        if (!options.includeRawAudio) return [3 /*break*/, 11];
                                        _o = {};
                                        return [4 /*yield*/, timeData.data()];
                                    case 10:
                                        _m = (_o.data = (_p.sent()),
                                            _o.sampleRateHz = this.audioDataExtractor.sampleRateHz,
                                            _o);
                                        return [3 /*break*/, 12];
                                    case 11:
                                        _m = undefined;
                                        _p.label = 12;
                                    case 12:
                                        _k.apply(_j, [(_l.rawAudio = _m,
                                                _l)]);
                                        // TODO(cais): Fix 1-tensor memory leak.
                                        resolve(finalSpectrogram);
                                        _p.label = 13;
                                    case 13: return [2 /*return*/, false];
                                }
                            });
                        }); };
                        _this.audioDataExtractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
                            sampleRateHz: _this.parameters.sampleRateHz,
                            numFramesPerSpectrogram: numFramesPerSpectrogram,
                            columnTruncateLength: _this.nonBatchInputShape[1],
                            suppressionTimeMillis: 0,
                            spectrogramCallback: spectrogramCallback,
                            overlapFactor: overlapFactor,
                            includeRawAudio: options.includeRawAudio
                        });
                        _this.audioDataExtractor.start(options.audioTrackConstraints);
                    })];
            });
        });
    };
    /**
     * Clear all transfer learning examples collected so far.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.clearExamples = function () {
        var _this = this;
        tf.util.assert(this.words != null && this.words.length > 0 && !this.dataset.empty(), function () {
            return "No transfer learning examples exist for model name " + _this.name;
        });
        this.dataset.clear();
        this.words = null;
    };
    /**
     * Get counts of the word examples that have been collected for a
     * transfer-learning model.
     *
     * @returns {{[word: string]: number}} A map from word name to number of
     *   examples collected for that word so far.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.countExamples = function () {
        if (this.dataset.empty()) {
            throw new Error("No examples have been collected for transfer-learning model " +
                ("named '" + this.name + "' yet."));
        }
        return this.dataset.getExampleCounts();
    };
    /**
     * Get examples currently held by the transfer-learning recognizer.
     *
     * @param label Label requested.
     * @returns An array of `Example`s, along with their UIDs.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.getExamples = function (label) {
        return this.dataset.getExamples(label);
    };
    /** Set the key frame index of a given example. */
    TransferBrowserFftSpeechCommandRecognizer.prototype.setExampleKeyFrameIndex = function (uid, keyFrameIndex) {
        this.dataset.setExampleKeyFrameIndex(uid, keyFrameIndex);
    };
    /**
     * Remove an example from the current dataset.
     *
     * @param uid The UID of the example to remove.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.removeExample = function (uid) {
        this.dataset.removeExample(uid);
        this.collateTransferWords();
    };
    /**
     * Check whether the underlying dataset is empty.
     *
     * @returns A boolean indicating whether the underlying dataset is empty.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.isDatasetEmpty = function () {
        return this.dataset.empty();
    };
    /**
     * Load an array of serialized examples.
     *
     * @param serialized The examples in their serialized format.
     * @param clearExisting Whether to clear the existing examples while
     *   performing the loading (default: false).
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.loadExamples = function (serialized, clearExisting) {
        var e_2, _a, e_3, _b;
        if (clearExisting === void 0) { clearExisting = false; }
        var incomingDataset = new dataset_1.Dataset(serialized);
        if (clearExisting) {
            this.clearExamples();
        }
        var incomingVocab = incomingDataset.getVocabulary();
        try {
            for (var incomingVocab_1 = __values(incomingVocab), incomingVocab_1_1 = incomingVocab_1.next(); !incomingVocab_1_1.done; incomingVocab_1_1 = incomingVocab_1.next()) {
                var label = incomingVocab_1_1.value;
                var examples = incomingDataset.getExamples(label);
                try {
                    for (var examples_1 = (e_3 = void 0, __values(examples)), examples_1_1 = examples_1.next(); !examples_1_1.done; examples_1_1 = examples_1.next()) {
                        var example = examples_1_1.value;
                        this.dataset.addExample(example.example);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (examples_1_1 && !examples_1_1.done && (_b = examples_1.return)) _b.call(examples_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (incomingVocab_1_1 && !incomingVocab_1_1.done && (_a = incomingVocab_1.return)) _a.call(incomingVocab_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.collateTransferWords();
    };
    /**
     * Serialize the existing examples.
     *
     * @param wordLabels Optional word label(s) to serialize. If specified, only
     *   the examples with labels matching the argument will be serialized. If
     *   any specified word label does not exist in the vocabulary of this
     *   transfer recognizer, an Error will be thrown.
     * @returns An `ArrayBuffer` object amenable to transmission and storage.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.serializeExamples = function (wordLabels) {
        return this.dataset.serialize(wordLabels);
    };
    /**
     * Collect the vocabulary of this transfer-learned recognizer.
     *
     * The words are put in an alphabetically sorted order.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.collateTransferWords = function () {
        this.words = this.dataset.getVocabulary();
    };
    /**
     * Collect the transfer-learning data as `tf.Tensor`s.
     *
     * Used for training and evaluation when the amount of data is relatively
     * small.
     *
     * @param windowHopRatio Ratio betwen hop length in number of frames and the
     *   number of frames in a long spectrogram. Used during extraction
     *   of multiple windows from the long spectrogram.
     * @returns xs: The feature tensors (xs), a 4D tf.Tensor.
     *          ys: The target tensors (ys), one-hot encoding, a 2D tf.Tensor.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.collectTransferDataAsTensors = function (windowHopRatio, augmentationOptions) {
        var numFrames = this.nonBatchInputShape[0];
        windowHopRatio = windowHopRatio || DEFAULT_WINDOW_HOP_RATIO;
        var hopFrames = Math.round(windowHopRatio * numFrames);
        var out = this.dataset.getData(null, __assign({ numFrames: numFrames, hopFrames: hopFrames }, augmentationOptions));
        return { xs: out.xs, ys: out.ys };
    };
    /**
     * Same as `collectTransferDataAsTensors`, but returns `tf.data.Dataset`s.
     *
     * Used for training and evaluation when the amount of data is large.
     *
     * @param windowHopRatio Ratio betwen hop length in number of frames and the
     *   number of frames in a long spectrogram. Used during extraction
     *   of multiple windows from the long spectrogram.
     * @param validationSplit The validation split to be used for splitting
     *   the raw data between the `tf.data.Dataset` objects for training and
     *   validation.
     * @param batchSize Batch size used for the `tf.data.Dataset.batch()` call
     *   during the creation of the dataset objects.
     * @return Two `tf.data.Dataset` objects, one for training and one for
     *   validation. Each of the objects may be directly fed into
     *   `this.model.fitDataset`.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.collectTransferDataAsTfDataset = function (windowHopRatio, validationSplit, batchSize, augmentationOptions) {
        if (validationSplit === void 0) { validationSplit = 0.15; }
        if (batchSize === void 0) { batchSize = 32; }
        var numFrames = this.nonBatchInputShape[0];
        windowHopRatio = windowHopRatio || DEFAULT_WINDOW_HOP_RATIO;
        var hopFrames = Math.round(windowHopRatio * numFrames);
        return this.dataset.getData(null, __assign({ numFrames: numFrames,
            hopFrames: hopFrames, getDataset: true, datasetBatchSize: batchSize, datasetValidationSplit: validationSplit }, augmentationOptions));
        // TODO(cais): See if we can tighten the typing.
    };
    /**
     * Train the transfer-learning model.
     *
     * The last dense layer of the base model is replaced with new softmax dense
     * layer.
     *
     * It is assume that at least one category of data has been collected (using
     * multiple calls to the `collectTransferExample` method).
     *
     * @param config {TransferLearnConfig} Optional configurations fot the
     *   training of the transfer-learning model.
     * @returns {tf.History} A history object with the loss and accuracy values
     *   from the training of the transfer-learning model.
     * @throws Error, if `modelName` is invalid or if not sufficient training
     *   examples have been collected yet.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.train = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var datasetDurationMillisThreshold;
            var _this = this;
            return __generator(this, function (_a) {
                tf.util.assert(this.words != null && this.words.length > 0, function () {
                    return "Cannot train transfer-learning model '" + _this.name + "' because no " +
                        "transfer learning example has been collected.";
                });
                tf.util.assert(this.words.length > 1, function () { return "Cannot train transfer-learning model '" + _this.name + "' because only " +
                    ("1 word label ('" + JSON.stringify(_this.words) + "') ") +
                    "has been collected for transfer learning. Requires at least 2."; });
                if (config.fineTuningEpochs != null) {
                    tf.util.assert(config.fineTuningEpochs >= 0 &&
                        Number.isInteger(config.fineTuningEpochs), function () { return "If specified, fineTuningEpochs must be a non-negative " +
                        ("integer, but received " + config.fineTuningEpochs); });
                }
                if (config == null) {
                    config = {};
                }
                if (this.model == null) {
                    this.createTransferModelFromBaseModel();
                }
                // This layer needs to be frozen for the initial phase of the
                // transfer learning. During subsequent fine-tuning (if any), it will
                // be unfrozen.
                this.secondLastBaseDenseLayer.trainable = false;
                // Compile model for training.
                this.model.compile({
                    loss: 'categoricalCrossentropy',
                    optimizer: config.optimizer || 'sgd',
                    metrics: ['acc']
                });
                datasetDurationMillisThreshold = config.fitDatasetDurationMillisThreshold == null ?
                    60e3 :
                    config.fitDatasetDurationMillisThreshold;
                if (this.dataset.durationMillis() > datasetDurationMillisThreshold) {
                    console.log("Detected large dataset: total duration = " +
                        (this.dataset.durationMillis() + " ms > ") +
                        (datasetDurationMillisThreshold + " ms. ") +
                        "Training transfer model using fitDataset() instead of fit()");
                    return [2 /*return*/, this.trainOnDataset(config)];
                }
                else {
                    return [2 /*return*/, this.trainOnTensors(config)];
                }
                return [2 /*return*/];
            });
        });
    };
    /** Helper function for training on tf.data.Dataset objects. */
    TransferBrowserFftSpeechCommandRecognizer.prototype.trainOnDataset = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var batchSize, windowHopRatio, _a, trainDataset, valDataset, t0, history, t0_1, fineTuningHistory;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        tf.util.assert(config.epochs > 0, function () { return "Invalid config.epochs"; });
                        batchSize = config.batchSize == null ? 32 : config.batchSize;
                        windowHopRatio = config.windowHopRatio || DEFAULT_WINDOW_HOP_RATIO;
                        _a = __read(this.collectTransferDataAsTfDataset(windowHopRatio, config.validationSplit, batchSize, { augmentByMixingNoiseRatio: config.augmentByMixingNoiseRatio }), 2), trainDataset = _a[0], valDataset = _a[1];
                        t0 = tf.util.now();
                        return [4 /*yield*/, this.model.fitDataset(trainDataset, {
                                epochs: config.epochs,
                                validationData: config.validationSplit > 0 ? valDataset : null,
                                callbacks: config.callback == null ? null : [config.callback]
                            })];
                    case 1:
                        history = _b.sent();
                        console.log("fitDataset() took " + (tf.util.now() - t0).toFixed(2) + " ms");
                        if (!(config.fineTuningEpochs != null && config.fineTuningEpochs > 0)) return [3 /*break*/, 3];
                        t0_1 = tf.util.now();
                        return [4 /*yield*/, this.fineTuningUsingTfDatasets(config, trainDataset, valDataset)];
                    case 2:
                        fineTuningHistory = _b.sent();
                        console.log("fitDataset() (fine-tuning) took " +
                            ((tf.util.now() - t0_1).toFixed(2) + " ms"));
                        return [2 /*return*/, [history, fineTuningHistory]];
                    case 3: return [2 /*return*/, history];
                }
            });
        });
    };
    /** Helper function for training on tf.Tensor objects. */
    TransferBrowserFftSpeechCommandRecognizer.prototype.trainOnTensors = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var windowHopRatio, _a, xs, ys, trainXs, trainYs, valData, splits, history_1, fineTuningHistory;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        windowHopRatio = config.windowHopRatio || DEFAULT_WINDOW_HOP_RATIO;
                        _a = this.collectTransferDataAsTensors(windowHopRatio, { augmentByMixingNoiseRatio: config.augmentByMixingNoiseRatio }), xs = _a.xs, ys = _a.ys;
                        console.log("Training data: xs.shape = " + xs.shape + ", ys.shape = " + ys.shape);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 6, 7]);
                        // TODO(cais): The balanced split may need to be pushed down to the
                        //   level of the Dataset class to avoid leaks between train and val
                        //   splits.
                        if (config.validationSplit != null) {
                            splits = training_utils_1.balancedTrainValSplit(xs, ys, config.validationSplit);
                            trainXs = splits.trainXs;
                            trainYs = splits.trainYs;
                            valData = [splits.valXs, splits.valYs];
                        }
                        else {
                            trainXs = xs;
                            trainYs = ys;
                        }
                        return [4 /*yield*/, this.model.fit(trainXs, trainYs, {
                                epochs: config.epochs == null ? 20 : config.epochs,
                                validationData: valData,
                                batchSize: config.batchSize,
                                callbacks: config.callback == null ? null : [config.callback]
                            })];
                    case 2:
                        history_1 = _b.sent();
                        if (!(config.fineTuningEpochs != null && config.fineTuningEpochs > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fineTuningUsingTensors(config, trainXs, trainYs, valData)];
                    case 3:
                        fineTuningHistory = _b.sent();
                        return [2 /*return*/, [history_1, fineTuningHistory]];
                    case 4: return [2 /*return*/, history_1];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        tf.dispose([xs, ys, trainXs, trainYs, valData]);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    TransferBrowserFftSpeechCommandRecognizer.prototype.fineTuningUsingTfDatasets = function (config, trainDataset, valDataset) {
        return __awaiter(this, void 0, void 0, function () {
            var originalTrainableValue, fineTuningOptimizer, fineTuningHistory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalTrainableValue = this.secondLastBaseDenseLayer.trainable;
                        this.secondLastBaseDenseLayer.trainable = true;
                        fineTuningOptimizer = config.fineTuningOptimizer == null ? 'sgd' : config.fineTuningOptimizer;
                        this.model.compile({
                            loss: 'categoricalCrossentropy',
                            optimizer: fineTuningOptimizer,
                            metrics: ['acc']
                        });
                        return [4 /*yield*/, this.model.fitDataset(trainDataset, {
                                epochs: config.fineTuningEpochs,
                                validationData: valDataset,
                                callbacks: config.callback == null ? null : [config.callback]
                            })];
                    case 1:
                        fineTuningHistory = _a.sent();
                        // Set the trainable attribute of the fine-tuning layer to its
                        // previous value.
                        this.secondLastBaseDenseLayer.trainable = originalTrainableValue;
                        return [2 /*return*/, fineTuningHistory];
                }
            });
        });
    };
    TransferBrowserFftSpeechCommandRecognizer.prototype.fineTuningUsingTensors = function (config, trainXs, trainYs, valData) {
        return __awaiter(this, void 0, void 0, function () {
            var originalTrainableValue, fineTuningOptimizer, fineTuningHistory;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalTrainableValue = this.secondLastBaseDenseLayer.trainable;
                        this.secondLastBaseDenseLayer.trainable = true;
                        fineTuningOptimizer = config.fineTuningOptimizer == null ? 'sgd' : config.fineTuningOptimizer;
                        this.model.compile({
                            loss: 'categoricalCrossentropy',
                            optimizer: fineTuningOptimizer,
                            metrics: ['acc']
                        });
                        return [4 /*yield*/, this.model.fit(trainXs, trainYs, {
                                epochs: config.fineTuningEpochs,
                                validationData: valData,
                                batchSize: config.batchSize,
                                callbacks: config.fineTuningCallback == null ? null :
                                    [config.fineTuningCallback]
                            })];
                    case 1:
                        fineTuningHistory = _a.sent();
                        // Set the trainable attribute of the fine-tuning layer to its
                        // previous value.
                        this.secondLastBaseDenseLayer.trainable = originalTrainableValue;
                        return [2 /*return*/, fineTuningHistory];
                }
            });
        });
    };
    /**
     * Perform evaluation of the model using the examples that the model
     * has loaded.
     *
     * @param config Configuration object for the evaluation.
     * @returns A Promise of the result of evaluation.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.evaluate = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var NOISE_CLASS_INDEX;
            var _this = this;
            return __generator(this, function (_a) {
                tf.util.assert(config.wordProbThresholds != null &&
                    config.wordProbThresholds.length > 0, function () { return "Received null or empty wordProbThresholds"; });
                NOISE_CLASS_INDEX = 0;
                tf.util.assert(this.words[NOISE_CLASS_INDEX] === dataset_1.BACKGROUND_NOISE_TAG, function () { return "Cannot perform evaluation when the first tag is not " +
                    ("" + dataset_1.BACKGROUND_NOISE_TAG); });
                return [2 /*return*/, tf.tidy(function () {
                        var rocCurve = [];
                        var auc = 0;
                        var _a = _this.collectTransferDataAsTensors(config.windowHopRatio), xs = _a.xs, ys = _a.ys;
                        var indices = ys.argMax(-1).dataSync();
                        var probs = _this.model.predict(xs);
                        // To calcaulte ROC, we collapse all word probabilites into a single
                        // positive class, while _background_noise_ is treated as the
                        // negative class.
                        var maxWordProbs = tf.max(tf.slice(probs, [0, 1], [probs.shape[0], probs.shape[1] - 1]), -1);
                        var total = probs.shape[0];
                        // Calculate ROC curve.
                        for (var i = 0; i < config.wordProbThresholds.length; ++i) {
                            var probThreshold = config.wordProbThresholds[i];
                            var isWord = maxWordProbs.greater(tf.scalar(probThreshold)).dataSync();
                            var negatives = 0;
                            var positives = 0;
                            var falsePositives = 0;
                            var truePositives = 0;
                            for (var i_1 = 0; i_1 < total; ++i_1) {
                                if (indices[i_1] === NOISE_CLASS_INDEX) {
                                    negatives++;
                                    if (isWord[i_1]) {
                                        falsePositives++;
                                    }
                                }
                                else {
                                    positives++;
                                    if (isWord[i_1]) {
                                        truePositives++;
                                    }
                                }
                            }
                            // TODO(cais): Calculate per-hour false-positive rate.
                            var fpr = falsePositives / negatives;
                            var tpr = truePositives / positives;
                            rocCurve.push({ probThreshold: probThreshold, fpr: fpr, tpr: tpr });
                            console.log("ROC thresh=" + probThreshold + ": " +
                                ("fpr=" + fpr.toFixed(4) + ", tpr=" + tpr.toFixed(4)));
                            if (i > 0) {
                                // Accumulate to AUC.
                                auc += Math.abs((rocCurve[i - 1].fpr - rocCurve[i].fpr)) *
                                    (rocCurve[i - 1].tpr + rocCurve[i].tpr) / 2;
                            }
                        }
                        return { rocCurve: rocCurve, auc: auc };
                    })];
            });
        });
    };
    /**
     * Create an instance of tf.LayersModel for transfer learning.
     *
     * The top dense layer of the base model is replaced with a new softmax
     * dense layer.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.createTransferModelFromBaseModel = function () {
        var _this = this;
        tf.util.assert(this.words != null, function () {
            return "No word example is available for tranfer-learning model of name " +
                _this.name;
        });
        // Find the second last dense layer.
        var layers = this.baseModel.layers;
        var layerIndex = layers.length - 2;
        while (layerIndex >= 0) {
            if (layers[layerIndex].getClassName().toLowerCase() === 'dense') {
                break;
            }
            layerIndex--;
        }
        if (layerIndex < 0) {
            throw new Error('Cannot find a hidden dense layer in the base model.');
        }
        this.secondLastBaseDenseLayer = layers[layerIndex];
        var truncatedBaseOutput = this.secondLastBaseDenseLayer.output;
        this.transferHead = tfl.sequential();
        this.transferHead.add(tfl.layers.dense({
            units: this.words.length,
            activation: 'softmax',
            inputShape: truncatedBaseOutput.shape.slice(1),
            name: 'NewHeadDense'
        }));
        var transferOutput = this.transferHead.apply(truncatedBaseOutput);
        this.model =
            tfl.model({ inputs: this.baseModel.inputs, outputs: transferOutput });
    };
    /**
     * Get the input shape of the underlying tf.LayersModel.
     *
     * @returns The input shape.
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.modelInputShape = function () {
        return this.baseModel.inputs[0].shape;
    };
    TransferBrowserFftSpeechCommandRecognizer.prototype.getMetadata = function () {
        return {
            tfjsSpeechCommandsVersion: version_1.version,
            modelName: this.name,
            timeStamp: new Date().toISOString(),
            wordLabels: this.wordLabels()
        };
    };
    TransferBrowserFftSpeechCommandRecognizer.prototype.save = function (handlerOrURL) {
        return __awaiter(this, void 0, void 0, function () {
            var isCustomPath, metadataMapStr, metadataMap;
            return __generator(this, function (_a) {
                isCustomPath = handlerOrURL != null;
                handlerOrURL = handlerOrURL || getCanonicalSavePath(this.name);
                if (!isCustomPath) {
                    metadataMapStr = exports.localStorageWrapper.localStorage.getItem(exports.SAVED_MODEL_METADATA_KEY);
                    metadataMap = metadataMapStr == null ? {} : JSON.parse(metadataMapStr);
                    metadataMap[this.name] = this.getMetadata();
                    exports.localStorageWrapper.localStorage.setItem(exports.SAVED_MODEL_METADATA_KEY, JSON.stringify(metadataMap));
                }
                console.log("Saving model to " + handlerOrURL);
                return [2 /*return*/, this.model.save(handlerOrURL)];
            });
        });
    };
    TransferBrowserFftSpeechCommandRecognizer.prototype.load = function (handlerOrURL) {
        return __awaiter(this, void 0, void 0, function () {
            var isCustomPath, metadataMap, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isCustomPath = handlerOrURL != null;
                        handlerOrURL = handlerOrURL || getCanonicalSavePath(this.name);
                        if (!isCustomPath) {
                            metadataMap = JSON.parse(exports.localStorageWrapper.localStorage.getItem(exports.SAVED_MODEL_METADATA_KEY));
                            if (metadataMap == null || metadataMap[this.name] == null) {
                                throw new Error("Cannot find metadata for transfer model named " + this.name + "\"");
                            }
                            this.words = metadataMap[this.name].wordLabels;
                            console.log("Loaded word list for model named " + this.name + ": " + this.words);
                        }
                        _a = this;
                        return [4 /*yield*/, tfl.loadLayersModel(handlerOrURL)];
                    case 1:
                        _a.model = _b.sent();
                        console.log("Loaded model from " + handlerOrURL + ":");
                        this.model.summary();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Overridden method to prevent creating a nested transfer-learning
     * recognizer.
     *
     * @param name
     */
    TransferBrowserFftSpeechCommandRecognizer.prototype.createTransfer = function (name) {
        throw new Error('Creating transfer-learned recognizer from a transfer-learned ' +
            'recognizer is not supported.');
    };
    return TransferBrowserFftSpeechCommandRecognizer;
}(BrowserFftSpeechCommandRecognizer));
function getCanonicalSavePath(name) {
    return "" + exports.SAVE_PATH_PREFIX + name;
}
/**
 * List the model that are currently saved locally in the browser.
 *
 * @returns An array of transfer-learned speech-commands models
 *   that are currently saved in the browser locally.
 */
function listSavedTransferModels() {
    return __awaiter(this, void 0, void 0, function () {
        var models, keys, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tf.io.listModels()];
                case 1:
                    models = _a.sent();
                    keys = [];
                    for (key in models) {
                        if (key.startsWith(exports.SAVE_PATH_PREFIX)) {
                            keys.push(key.slice(exports.SAVE_PATH_PREFIX.length));
                        }
                    }
                    return [2 /*return*/, keys];
            }
        });
    });
}
exports.listSavedTransferModels = listSavedTransferModels;
/**
 * Delete a locally-saved, transfer-learned speech-commands model.
 *
 * @param name The name of the transfer-learned model to be deleted.
 */
function deleteSavedTransferModel(name) {
    return __awaiter(this, void 0, void 0, function () {
        var metadataMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metadataMap = JSON.parse(exports.localStorageWrapper.localStorage.getItem(exports.SAVED_MODEL_METADATA_KEY));
                    if (metadataMap == null) {
                        metadataMap = {};
                    }
                    if (metadataMap[name] != null) {
                        delete metadataMap[name];
                    }
                    exports.localStorageWrapper.localStorage.setItem(exports.SAVED_MODEL_METADATA_KEY, JSON.stringify(metadataMap));
                    return [4 /*yield*/, tf.io.removeModel(getCanonicalSavePath(name))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteSavedTransferModel = deleteSavedTransferModel;
//# sourceMappingURL=browser_fft_recognizer.js.map