/**
    * @license
    * Copyright 2021 Google LLC. All Rights Reserved.
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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tensorflow/tfjs-core'), require('util'), require('@tensorflow/tfjs-data'), require('@tensorflow/tfjs-layers')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tensorflow/tfjs-core', 'util', '@tensorflow/tfjs-data', '@tensorflow/tfjs-layers'], factory) :
    (factory((global.speechCommands = {}),global.tf,null,global.tf.data,global.tf));
}(this, (function (exports,tf,util,tfd,tfl) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
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
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
    function loadMetadataJson(url) {
        return __awaiter(this, void 0, void 0, function () {
            var HTTP_SCHEME, HTTPS_SCHEME, FILE_SCHEME, response, parsed, fs, readFile, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        HTTP_SCHEME = 'http://';
                        HTTPS_SCHEME = 'https://';
                        FILE_SCHEME = 'file://';
                        if (!(url.indexOf(HTTP_SCHEME) === 0 || url.indexOf(HTTPS_SCHEME) === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _c.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        parsed = _c.sent();
                        return [2 /*return*/, parsed];
                    case 3:
                        if (!(url.indexOf(FILE_SCHEME) === 0)) return [3 /*break*/, 5];
                        fs = require('fs');
                        readFile = util.promisify(fs.readFile);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, readFile(url.slice(FILE_SCHEME.length), { encoding: 'utf-8' })];
                    case 4: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                    case 5: throw new Error("Unsupported URL scheme in metadata URL: " + url + ". " +
                        "Supported schemes are: http://, https://, and " +
                        "(node.js-only) file://");
                }
            });
        });
    }
    var EPSILON = null;
    /**
     * Normalize the input into zero mean and unit standard deviation.
     *
     * This function is safe against divison-by-zero: In case the standard
     * deviation is zero, the output will be all-zero.
     *
     * @param x Input tensor.
     * @param y Output normalized tensor.
     */
    function normalize(x) {
        if (EPSILON == null) {
            EPSILON = tf.backend().epsilon();
        }
        return tf.tidy(function () {
            var _a = tf.moments(x), mean = _a.mean, variance = _a.variance;
            // Add an EPSILON to the denominator to prevent division-by-zero.
            return tf.div(tf.sub(x, mean), tf.add(tf.sqrt(variance), EPSILON));
        });
    }
    /**
     * Z-Normalize the elements of a Float32Array.
     *
     * Subtract the mean and divide the result by the standard deviation.
     *
     * @param x The Float32Array to normalize.
     * @return Noramlzied Float32Array.
     */
    function normalizeFloat32Array(x) {
        if (x.length < 2) {
            throw new Error('Cannot normalize a Float32Array with fewer than 2 elements.');
        }
        if (EPSILON == null) {
            EPSILON = tf.backend().epsilon();
        }
        return tf.tidy(function () {
            var _a = tf.moments(tf.tensor1d(x)), mean = _a.mean, variance = _a.variance;
            var meanVal = mean.arraySync();
            var stdVal = Math.sqrt(variance.arraySync());
            var yArray = Array.from(x).map(function (y) { return (y - meanVal) / (stdVal + EPSILON); });
            return new Float32Array(yArray);
        });
    }
    function getAudioContextConstructor() {
        // tslint:disable-next-line:no-any
        return window.AudioContext || window.webkitAudioContext;
    }
    function getAudioMediaStream(audioTrackConstraints) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, navigator.mediaDevices.getUserMedia({
                        audio: audioTrackConstraints == null ? true : audioTrackConstraints,
                        video: false
                    })];
            });
        });
    }
    /**
     * Play raw audio waveform
     * @param rawAudio Raw audio data, including the waveform and the sampling rate.
     * @param onEnded Callback function to execute when the playing ends.
     */
    function playRawAudio(rawAudio, onEnded) {
        var audioContextConstructor = 
        // tslint:disable-next-line:no-any
        window.AudioContext || window.webkitAudioContext;
        var audioContext = new audioContextConstructor();
        var arrayBuffer = audioContext.createBuffer(1, rawAudio.data.length, rawAudio.sampleRateHz);
        var nowBuffering = arrayBuffer.getChannelData(0);
        nowBuffering.set(rawAudio.data);
        var source = audioContext.createBufferSource();
        source.buffer = arrayBuffer;
        source.connect(audioContext.destination);
        source.start();
        source.onended = function () {
            if (onEnded != null) {
                onEnded();
            }
        };
    }

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
     * Audio feature extractor based on Browser-native FFT.
     *
     * Uses AudioContext and analyser node.
     */
    var BrowserFftFeatureExtractor = /** @class */ (function () {
        /**
         * Constructor of BrowserFftFeatureExtractor.
         *
         * @param config Required configuration object.
         */
        function BrowserFftFeatureExtractor(config) {
            var _this = this;
            if (config == null) {
                throw new Error("Required configuration object is missing for " +
                    "BrowserFftFeatureExtractor constructor");
            }
            if (config.spectrogramCallback == null) {
                throw new Error("spectrogramCallback cannot be null or undefined");
            }
            if (!(config.numFramesPerSpectrogram > 0)) {
                throw new Error("Invalid value in numFramesPerSpectrogram: " +
                    ("" + config.numFramesPerSpectrogram));
            }
            if (config.suppressionTimeMillis < 0) {
                throw new Error("Expected suppressionTimeMillis to be >= 0, " +
                    ("but got " + config.suppressionTimeMillis));
            }
            this.suppressionTimeMillis = config.suppressionTimeMillis;
            this.spectrogramCallback = config.spectrogramCallback;
            this.numFrames = config.numFramesPerSpectrogram;
            this.sampleRateHz = config.sampleRateHz || 44100;
            this.fftSize = config.fftSize || 1024;
            this.frameDurationMillis = this.fftSize / this.sampleRateHz * 1e3;
            this.columnTruncateLength = config.columnTruncateLength || this.fftSize;
            this.overlapFactor = config.overlapFactor;
            this.includeRawAudio = config.includeRawAudio;
            tf.util.assert(this.overlapFactor >= 0 && this.overlapFactor < 1, function () { return "Expected overlapFactor to be >= 0 and < 1, " +
                ("but got " + _this.overlapFactor); });
            if (this.columnTruncateLength > this.fftSize) {
                throw new Error("columnTruncateLength " + this.columnTruncateLength + " exceeds " +
                    ("fftSize (" + this.fftSize + ")."));
            }
            this.audioContextConstructor = getAudioContextConstructor();
        }
        BrowserFftFeatureExtractor.prototype.start = function (audioTrackConstraints) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, streamSource, period;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.frameIntervalTask != null) {
                                throw new Error('Cannot start already-started BrowserFftFeatureExtractor');
                            }
                            _a = this;
                            return [4 /*yield*/, getAudioMediaStream(audioTrackConstraints)];
                        case 1:
                            _a.stream = _b.sent();
                            this.audioContext = new this.audioContextConstructor({ sampleRate: this.sampleRateHz });
                            streamSource = this.audioContext.createMediaStreamSource(this.stream);
                            this.analyser = this.audioContext.createAnalyser();
                            this.analyser.fftSize = this.fftSize * 2;
                            this.analyser.smoothingTimeConstant = 0.0;
                            streamSource.connect(this.analyser);
                            // Reset the queue.
                            this.freqDataQueue = [];
                            this.freqData = new Float32Array(this.fftSize);
                            if (this.includeRawAudio) {
                                this.timeDataQueue = [];
                                this.timeData = new Float32Array(this.fftSize);
                            }
                            period = Math.max(1, Math.round(this.numFrames * (1 - this.overlapFactor)));
                            this.tracker = new Tracker(period, Math.round(this.suppressionTimeMillis / this.frameDurationMillis));
                            this.frameIntervalTask = setInterval(this.onAudioFrame.bind(this), this.fftSize / this.sampleRateHz * 1e3);
                            return [2 /*return*/];
                    }
                });
            });
        };
        BrowserFftFeatureExtractor.prototype.onAudioFrame = function () {
            return __awaiter(this, void 0, void 0, function () {
                var shouldFire, freqData, freqDataTensor, timeDataTensor, timeData, shouldRest;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.analyser.getFloatFrequencyData(this.freqData);
                            if (this.freqData[0] === -Infinity) {
                                return [2 /*return*/];
                            }
                            this.freqDataQueue.push(this.freqData.slice(0, this.columnTruncateLength));
                            if (this.includeRawAudio) {
                                this.analyser.getFloatTimeDomainData(this.timeData);
                                this.timeDataQueue.push(this.timeData.slice());
                            }
                            if (this.freqDataQueue.length > this.numFrames) {
                                // Drop the oldest frame (least recent).
                                this.freqDataQueue.shift();
                            }
                            shouldFire = this.tracker.tick();
                            if (!shouldFire) return [3 /*break*/, 2];
                            freqData = flattenQueue(this.freqDataQueue);
                            freqDataTensor = getInputTensorFromFrequencyData(freqData, [1, this.numFrames, this.columnTruncateLength, 1]);
                            timeDataTensor = void 0;
                            if (this.includeRawAudio) {
                                timeData = flattenQueue(this.timeDataQueue);
                                timeDataTensor = getInputTensorFromFrequencyData(timeData, [1, this.numFrames * this.fftSize]);
                            }
                            return [4 /*yield*/, this.spectrogramCallback(freqDataTensor, timeDataTensor)];
                        case 1:
                            shouldRest = _a.sent();
                            if (shouldRest) {
                                this.tracker.suppress();
                            }
                            tf.dispose([freqDataTensor, timeDataTensor]);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        BrowserFftFeatureExtractor.prototype.stop = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.frameIntervalTask == null) {
                        throw new Error('Cannot stop because there is no ongoing streaming activity.');
                    }
                    clearInterval(this.frameIntervalTask);
                    this.frameIntervalTask = null;
                    this.analyser.disconnect();
                    this.audioContext.close();
                    if (this.stream != null && this.stream.getTracks().length > 0) {
                        this.stream.getTracks()[0].stop();
                    }
                    return [2 /*return*/];
                });
            });
        };
        BrowserFftFeatureExtractor.prototype.setConfig = function (params) {
            throw new Error('setConfig() is not implemented for BrowserFftFeatureExtractor.');
        };
        BrowserFftFeatureExtractor.prototype.getFeatures = function () {
            throw new Error('getFeatures() is not implemented for ' +
                'BrowserFftFeatureExtractor. Use the spectrogramCallback ' +
                'field of the constructor config instead.');
        };
        return BrowserFftFeatureExtractor;
    }());
    function flattenQueue(queue) {
        var frameSize = queue[0].length;
        var freqData = new Float32Array(queue.length * frameSize);
        queue.forEach(function (data, i) { return freqData.set(data, i * frameSize); });
        return freqData;
    }
    function getInputTensorFromFrequencyData(freqData, shape) {
        var vals = new Float32Array(tf.util.sizeFromShape(shape));
        // If the data is less than the output shape, the rest is padded with zeros.
        vals.set(freqData, vals.length - freqData.length);
        return tf.tensor(vals, shape);
    }
    /**
     * A class that manages the firing of events based on periods
     * and suppression time.
     */
    var Tracker = /** @class */ (function () {
        /**
         * Constructor of Tracker.
         *
         * @param period The event-firing period, in number of frames.
         * @param suppressionPeriod The suppression period, in number of frames.
         */
        function Tracker(period, suppressionPeriod) {
            var _this = this;
            this.period = period;
            this.suppressionTime = suppressionPeriod == null ? 0 : suppressionPeriod;
            this.counter = 0;
            tf.util.assert(this.period > 0, function () { return "Expected period to be positive, but got " + _this.period; });
        }
        /**
         * Mark a frame.
         *
         * @returns Whether the event should be fired at the current frame.
         */
        Tracker.prototype.tick = function () {
            this.counter++;
            var shouldFire = (this.counter % this.period === 0) &&
                (this.suppressionOnset == null ||
                    this.counter - this.suppressionOnset > this.suppressionTime);
            return shouldFire;
        };
        /**
         * Order the beginning of a supression period.
         */
        Tracker.prototype.suppress = function () {
            this.suppressionOnset = this.counter;
        };
        return Tracker;
    }());

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
     * Concatenate a number of ArrayBuffers into one.
     *
     * @param buffers A number of array buffers to concatenate.
     * @returns Result of concatenating `buffers` in order.
     */
    function concatenateArrayBuffers(buffers) {
        var totalByteLength = 0;
        buffers.forEach(function (buffer) {
            totalByteLength += buffer.byteLength;
        });
        var temp = new Uint8Array(totalByteLength);
        var offset = 0;
        buffers.forEach(function (buffer) {
            temp.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
        });
        return temp.buffer;
    }
    /**
     * Concatenate Float32Arrays.
     *
     * @param xs Float32Arrays to concatenate.
     * @return The result of the concatenation.
     */
    function concatenateFloat32Arrays(xs) {
        var totalLength = 0;
        xs.forEach(function (x) { return totalLength += x.length; });
        var concatenated = new Float32Array(totalLength);
        var index = 0;
        xs.forEach(function (x) {
            concatenated.set(x, index);
            index += x.length;
        });
        return concatenated;
    }
    /** Encode a string as an ArrayBuffer. */
    function string2ArrayBuffer(str) {
        if (str == null) {
            throw new Error('Received null or undefind string');
        }
        // NOTE(cais): This implementation is inefficient in terms of memory.
        // But it works for UTF-8 strings. Just don't use on for very long strings.
        var strUTF8 = unescape(encodeURIComponent(str));
        var buf = new Uint8Array(strUTF8.length);
        for (var i = 0; i < strUTF8.length; ++i) {
            buf[i] = strUTF8.charCodeAt(i);
        }
        return buf.buffer;
    }
    /** Decode an ArrayBuffer as a string. */
    function arrayBuffer2String(buffer) {
        if (buffer == null) {
            throw new Error('Received null or undefind buffer');
        }
        var buf = new Uint8Array(buffer);
        return decodeURIComponent(escape(String.fromCharCode.apply(String, __spread(buf))));
    }
    /** Generate a pseudo-random UID. */
    function getUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() +
            s4() + s4();
    }
    function getRandomInteger(min, max) {
        return Math.floor((max - min) * Math.random()) + min;
    }

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
    function balancedTrainValSplit(xs, ys, valSplit) {
        tf.util.assert(valSplit > 0 && valSplit < 1, function () { return "validationSplit is expected to be >0 and <1, " +
            ("but got " + valSplit); });
        return tf.tidy(function () {
            var classIndices = tf.argMax(ys, -1).dataSync();
            var indicesByClasses = [];
            for (var i = 0; i < classIndices.length; ++i) {
                var classIndex = classIndices[i];
                if (indicesByClasses[classIndex] == null) {
                    indicesByClasses[classIndex] = [];
                }
                indicesByClasses[classIndex].push(i);
            }
            var numClasses = indicesByClasses.length;
            var trainIndices = [];
            var valIndices = [];
            // Randomly shuffle the list of indices in each array.
            indicesByClasses.map(function (classIndices) { return tf.util.shuffle(classIndices); });
            for (var i = 0; i < numClasses; ++i) {
                var classIndices_1 = indicesByClasses[i];
                var cutoff = Math.round(classIndices_1.length * (1 - valSplit));
                for (var j = 0; j < classIndices_1.length; ++j) {
                    if (j < cutoff) {
                        trainIndices.push(classIndices_1[j]);
                    }
                    else {
                        valIndices.push(classIndices_1[j]);
                    }
                }
            }
            var trainXs = tf.gather(xs, trainIndices);
            var trainYs = tf.gather(ys, trainIndices);
            var valXs = tf.gather(xs, valIndices);
            var valYs = tf.gather(ys, valIndices);
            return { trainXs: trainXs, trainYs: trainYs, valXs: valXs, valYs: valYs };
        });
    }
    /**
     * Same as balancedTrainValSplit, but for number arrays or Float32Arrays.
     */
    function balancedTrainValSplitNumArrays(xs, ys, valSplit) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        tf.util.assert(valSplit > 0 && valSplit < 1, function () { return "validationSplit is expected to be >0 and <1, " +
            ("but got " + valSplit); });
        var isXsFloat32Array = !Array.isArray(xs[0]);
        var classIndices = ys;
        var indicesByClasses = [];
        for (var i = 0; i < classIndices.length; ++i) {
            var classIndex = classIndices[i];
            if (indicesByClasses[classIndex] == null) {
                indicesByClasses[classIndex] = [];
            }
            indicesByClasses[classIndex].push(i);
        }
        var numClasses = indicesByClasses.length;
        var trainIndices = [];
        var valIndices = [];
        // Randomly shuffle the list of indices in each array.
        indicesByClasses.map(function (classIndices) { return tf.util.shuffle(classIndices); });
        for (var i = 0; i < numClasses; ++i) {
            var classIndices_2 = indicesByClasses[i];
            var cutoff = Math.round(classIndices_2.length * (1 - valSplit));
            for (var j = 0; j < classIndices_2.length; ++j) {
                if (j < cutoff) {
                    trainIndices.push(classIndices_2[j]);
                }
                else {
                    valIndices.push(classIndices_2[j]);
                }
            }
        }
        if (isXsFloat32Array) {
            var trainXs = [];
            var trainYs = [];
            var valXs = [];
            var valYs = [];
            try {
                for (var trainIndices_1 = __values(trainIndices), trainIndices_1_1 = trainIndices_1.next(); !trainIndices_1_1.done; trainIndices_1_1 = trainIndices_1.next()) {
                    var index = trainIndices_1_1.value;
                    trainXs.push(xs[index]);
                    trainYs.push(ys[index]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (trainIndices_1_1 && !trainIndices_1_1.done && (_a = trainIndices_1.return)) _a.call(trainIndices_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var valIndices_1 = __values(valIndices), valIndices_1_1 = valIndices_1.next(); !valIndices_1_1.done; valIndices_1_1 = valIndices_1.next()) {
                    var index = valIndices_1_1.value;
                    valXs.push(xs[index]);
                    valYs.push(ys[index]);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (valIndices_1_1 && !valIndices_1_1.done && (_b = valIndices_1.return)) _b.call(valIndices_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return { trainXs: trainXs, trainYs: trainYs, valXs: valXs, valYs: valYs };
        }
        else {
            var trainXs = [];
            var trainYs = [];
            var valXs = [];
            var valYs = [];
            try {
                for (var trainIndices_2 = __values(trainIndices), trainIndices_2_1 = trainIndices_2.next(); !trainIndices_2_1.done; trainIndices_2_1 = trainIndices_2.next()) {
                    var index = trainIndices_2_1.value;
                    trainXs.push(xs[index]);
                    trainYs.push(ys[index]);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (trainIndices_2_1 && !trainIndices_2_1.done && (_c = trainIndices_2.return)) _c.call(trainIndices_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var valIndices_2 = __values(valIndices), valIndices_2_1 = valIndices_2.next(); !valIndices_2_1.done; valIndices_2_1 = valIndices_2.next()) {
                    var index = valIndices_2_1.value;
                    valXs.push(xs[index]);
                    valYs.push(ys[index]);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (valIndices_2_1 && !valIndices_2_1.done && (_d = valIndices_2.return)) _d.call(valIndices_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return { trainXs: trainXs, trainYs: trainYs, valXs: valXs, valYs: valYs };
        }
    }

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
    // Descriptor for serialized dataset files: stands for:
    //   TensorFlow.js Speech-Commands Dataset.
    // DO NOT EVER CHANGE THIS!
    var DATASET_SERIALIZATION_DESCRIPTOR = 'TFJSSCDS';
    // A version number for the serialization. Since this needs
    // to be encoded within a length-1 Uint8 array, it must be
    //   1. an positive integer.
    //   2. monotonically increasing over its change history.
    // Item 1 is checked by unit tests.
    var DATASET_SERIALIZATION_VERSION = 1;
    var BACKGROUND_NOISE_TAG = '_background_noise_';
    /**
     * A serializable, mutable set of speech/audio `Example`s;
     */
    var Dataset = /** @class */ (function () {
        /**
         * Constructor of `Dataset`.
         *
         * If called with no arguments (i.e., `artifacts` == null), an empty dataset
         * will be constructed.
         *
         * Else, the dataset will be deserialized from `artifacts`.
         *
         * @param serialized Optional serialization artifacts to deserialize.
         */
        function Dataset(serialized) {
            this.examples = {};
            this.label2Ids = {};
            if (serialized != null) {
                // Deserialize from the provided artifacts.
                var artifacts = arrayBuffer2SerializedExamples(serialized);
                var offset = 0;
                for (var i = 0; i < artifacts.manifest.length; ++i) {
                    var spec = artifacts.manifest[i];
                    var byteLen = spec.spectrogramNumFrames * spec.spectrogramFrameSize;
                    if (spec.rawAudioNumSamples != null) {
                        byteLen += spec.rawAudioNumSamples;
                    }
                    byteLen *= 4;
                    this.addExample(deserializeExample({ spec: spec, data: artifacts.data.slice(offset, offset + byteLen) }));
                    offset += byteLen;
                }
            }
        }
        /**
         * Add an `Example` to the `Dataset`
         *
         * @param example A `Example`, with a label. The label must be a non-empty
         *   string.
         * @returns The UID for the added `Example`.
         */
        Dataset.prototype.addExample = function (example) {
            tf.util.assert(example != null, function () { return 'Got null or undefined example'; });
            tf.util.assert(example.label != null && example.label.length > 0, function () { return "Expected label to be a non-empty string, " +
                ("but got " + JSON.stringify(example.label)); });
            var uid = getUID();
            this.examples[uid] = example;
            if (!(example.label in this.label2Ids)) {
                this.label2Ids[example.label] = [];
            }
            this.label2Ids[example.label].push(uid);
            return uid;
        };
        /**
         * Merge the incoming dataset into this dataset
         *
         * @param dataset The incoming dataset to be merged into this dataset.
         */
        Dataset.prototype.merge = function (dataset) {
            var e_1, _a, e_2, _b;
            tf.util.assert(dataset !== this, function () { return 'Cannot merge a dataset into itself'; });
            var vocab = dataset.getVocabulary();
            try {
                for (var vocab_1 = __values(vocab), vocab_1_1 = vocab_1.next(); !vocab_1_1.done; vocab_1_1 = vocab_1.next()) {
                    var word = vocab_1_1.value;
                    var examples = dataset.getExamples(word);
                    try {
                        for (var examples_1 = (e_2 = void 0, __values(examples)), examples_1_1 = examples_1.next(); !examples_1_1.done; examples_1_1 = examples_1.next()) {
                            var example = examples_1_1.value;
                            this.addExample(example.example);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (examples_1_1 && !examples_1_1.done && (_b = examples_1.return)) _b.call(examples_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (vocab_1_1 && !vocab_1_1.done && (_a = vocab_1.return)) _a.call(vocab_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * Get a map from `Example` label to number of `Example`s with the label.
         *
         * @returns A map from label to number of example counts under that label.
         */
        Dataset.prototype.getExampleCounts = function () {
            var counts = {};
            for (var uid in this.examples) {
                var example = this.examples[uid];
                if (!(example.label in counts)) {
                    counts[example.label] = 0;
                }
                counts[example.label]++;
            }
            return counts;
        };
        /**
         * Get all examples of a given label, with their UIDs.
         *
         * @param label The requested label.
         * @return All examples of the given `label`, along with their UIDs.
         *   The examples are sorted in the order in which they are added to the
         *   `Dataset`.
         * @throws Error if label is `null` or `undefined`.
         */
        Dataset.prototype.getExamples = function (label) {
            var _this = this;
            tf.util.assert(label != null, function () {
                return "Expected label to be a string, but got " + JSON.stringify(label);
            });
            tf.util.assert(label in this.label2Ids, function () { return "No example of label \"" + label + "\" exists in dataset"; });
            var output = [];
            this.label2Ids[label].forEach(function (id) {
                output.push({ uid: id, example: _this.examples[id] });
            });
            return output;
        };
        /**
         * Get all examples and labels as tensors.
         *
         * - If `label` is provided and exists in the vocabulary of the `Dataset`,
         *   the spectrograms of all `Example`s under the `label` will be returned
         *   as a 4D `tf.Tensor` as `xs`. The shape of the `tf.Tensor` will be
         *     `[numExamples, numFrames, frameSize, 1]`
         *   where
         *     - `numExamples` is the number of `Example`s with the label
         *     - `numFrames` is the number of frames in each spectrogram
         *     - `frameSize` is the size of each spectrogram frame.
         *   No label Tensor will be returned.
         * - If `label` is not provided, all `Example`s will be returned as `xs`.
         *   In addition, `ys` will contain a one-hot encoded list of labels.
         *   - The shape of `xs` will be: `[numExamples, numFrames, frameSize, 1]`
         *   - The shape of `ys` will be: `[numExamples, vocabularySize]`.
         *
         * @returns If `config.getDataset` is `true`, returns two `tf.data.Dataset`
         *   objects, one for training and one for validation.
         *   Else, xs` and `ys` tensors. See description above.
         * @throws Error
         *   - if not all the involved spectrograms have matching `numFrames` and
         *     `frameSize`, or
         *   - if `label` is provided and is not present in the vocabulary of the
         *     `Dataset`, or
         *   - if the `Dataset` is currently empty.
         */
        Dataset.prototype.getData = function (label, config) {
            var _this = this;
            tf.util.assert(this.size() > 0, function () {
                return "Cannot get spectrograms as tensors because the dataset is empty";
            });
            var vocab = this.getVocabulary();
            if (label != null) {
                tf.util.assert(vocab.indexOf(label) !== -1, function () { return "Label " + label + " is not in the vocabulary " +
                    ("(" + JSON.stringify(vocab) + ")"); });
            }
            else {
                // If all words are requested, there must be at least two words in the
                // vocabulary to make one-hot encoding possible.
                tf.util.assert(vocab.length > 1, function () { return "One-hot encoding of labels requires the vocabulary to have " +
                    ("at least two words, but it has only " + vocab.length + " word."); });
            }
            if (config == null) {
                config = {};
            }
            // Get the numFrames lengths of all the examples currently held by the
            // dataset.
            var sortedUniqueNumFrames = this.getSortedUniqueNumFrames();
            var numFrames;
            var hopFrames;
            if (sortedUniqueNumFrames.length === 1) {
                numFrames = config.numFrames == null ? sortedUniqueNumFrames[0] :
                    config.numFrames;
                hopFrames = config.hopFrames == null ? 1 : config.hopFrames;
            }
            else {
                numFrames = config.numFrames;
                tf.util.assert(numFrames != null && Number.isInteger(numFrames) && numFrames > 0, function () { return "There are " + sortedUniqueNumFrames.length + " unique lengths among " +
                    ("the " + _this.size() + " examples of this Dataset, hence numFrames ") +
                    "is required. But it is not provided."; });
                tf.util.assert(numFrames <= sortedUniqueNumFrames[0], function () { return "numFrames (" + numFrames + ") exceeds the minimum numFrames " +
                    ("(" + sortedUniqueNumFrames[0] + ") among the examples of ") +
                    "the Dataset."; });
                hopFrames = config.hopFrames;
                tf.util.assert(hopFrames != null && Number.isInteger(hopFrames) && hopFrames > 0, function () { return "There are " + sortedUniqueNumFrames.length + " unique lengths among " +
                    ("the " + _this.size() + " examples of this Dataset, hence hopFrames ") +
                    "is required. But it is not provided."; });
            }
            // Normalization is performed by default.
            var toNormalize = config.normalize == null ? true : config.normalize;
            return tf.tidy(function () {
                var e_3, _a;
                var xTensors = [];
                var xArrays = [];
                var labelIndices = [];
                var uniqueFrameSize;
                for (var i = 0; i < vocab.length; ++i) {
                    var currentLabel = vocab[i];
                    if (label != null && currentLabel !== label) {
                        continue;
                    }
                    var ids = _this.label2Ids[currentLabel];
                    var _loop_1 = function (id) {
                        var e_4, _a;
                        var example = _this.examples[id];
                        var spectrogram = example.spectrogram;
                        var frameSize = spectrogram.frameSize;
                        if (uniqueFrameSize == null) {
                            uniqueFrameSize = frameSize;
                        }
                        else {
                            tf.util.assert(frameSize === uniqueFrameSize, function () { return "Mismatch in frameSize  " +
                                ("(" + frameSize + " vs " + uniqueFrameSize + ")"); });
                        }
                        var snippetLength = spectrogram.data.length / frameSize;
                        var focusIndex = null;
                        if (currentLabel !== BACKGROUND_NOISE_TAG) {
                            focusIndex = spectrogram.keyFrameIndex == null ?
                                getMaxIntensityFrameIndex(spectrogram).dataSync()[0] :
                                spectrogram.keyFrameIndex;
                        }
                        // TODO(cais): See if we can get rid of dataSync();
                        var snippet = tf.tensor3d(spectrogram.data, [snippetLength, frameSize, 1]);
                        var windows = getValidWindows(snippetLength, focusIndex, numFrames, hopFrames);
                        var _loop_2 = function (window_1) {
                            var windowedSnippet = tf.tidy(function () {
                                var output = tf.slice(snippet, [window_1[0], 0, 0], [window_1[1] - window_1[0], -1, -1]);
                                return toNormalize ? normalize(output) : output;
                            });
                            if (config.getDataset) {
                                // TODO(cais): See if we can do away with dataSync();
                                // TODO(cais): Shuffling?
                                xArrays.push(windowedSnippet.dataSync());
                            }
                            else {
                                xTensors.push(windowedSnippet);
                            }
                            if (label == null) {
                                labelIndices.push(i);
                            }
                        };
                        try {
                            for (var windows_1 = (e_4 = void 0, __values(windows)), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
                                var window_1 = windows_1_1.value;
                                _loop_2(window_1);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        tf.dispose(snippet); // For memory saving.
                    };
                    try {
                        for (var ids_1 = (e_3 = void 0, __values(ids)), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                            var id = ids_1_1.value;
                            _loop_1(id);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
                if (config.augmentByMixingNoiseRatio != null) {
                    _this.augmentByMixingNoise(config.getDataset ? xArrays :
                        xTensors, labelIndices, config.augmentByMixingNoiseRatio);
                }
                var shuffle = config.shuffle == null ? true : config.shuffle;
                if (config.getDataset) {
                    var batchSize = config.datasetBatchSize == null ? 32 : config.datasetBatchSize;
                    // Split the data into two splits: training and validation.
                    var valSplit_1 = config.datasetValidationSplit == null ?
                        0.15 :
                        config.datasetValidationSplit;
                    tf.util.assert(valSplit_1 > 0 && valSplit_1 < 1, function () { return "Invalid dataset validation split: " + valSplit_1; });
                    var zippedXandYArrays = xArrays.map(function (xArray, i) { return [xArray, labelIndices[i]]; });
                    tf.util.shuffle(zippedXandYArrays); // Shuffle the data before splitting.
                    xArrays = zippedXandYArrays.map(function (item) { return item[0]; });
                    var yArrays = zippedXandYArrays.map(function (item) { return item[1]; });
                    var _b = balancedTrainValSplitNumArrays(xArrays, yArrays, valSplit_1), trainXs = _b.trainXs, trainYs = _b.trainYs, valXs = _b.valXs, valYs = _b.valYs;
                    // TODO(cais): The typing around Float32Array is not working properly
                    // for tf.data currently. Tighten the types when the tf.data bug is
                    // fixed.
                    // tslint:disable:no-any
                    var xTrain = tfd.array(trainXs).map(function (x) { return tf.tensor3d(x, [
                        numFrames, uniqueFrameSize, 1
                    ]); });
                    var yTrain = tfd.array(trainYs).map(function (y) { return tf.squeeze(tf.oneHot([y], vocab.length), [0]); });
                    // TODO(cais): See if we can tighten the typing.
                    var trainDataset = tfd.zip({ xs: xTrain, ys: yTrain });
                    if (shuffle) {
                        // Shuffle the dataset.
                        trainDataset = trainDataset.shuffle(xArrays.length);
                    }
                    trainDataset = trainDataset.batch(batchSize).prefetch(4);
                    var xVal = tfd.array(valXs).map(function (x) { return tf.tensor3d(x, [
                        numFrames, uniqueFrameSize, 1
                    ]); });
                    var yVal = tfd.array(valYs).map(function (y) { return tf.squeeze(tf.oneHot([y], vocab.length), [0]); });
                    var valDataset = tfd.zip({ xs: xVal, ys: yVal });
                    valDataset = valDataset.batch(batchSize).prefetch(4);
                    // tslint:enable:no-any
                    // tslint:disable-next-line:no-any
                    return [trainDataset, valDataset];
                }
                else {
                    if (shuffle) {
                        // Shuffle the data.
                        var zipped_1 = [];
                        xTensors.forEach(function (xTensor, i) {
                            zipped_1.push({ x: xTensor, y: labelIndices[i] });
                        });
                        tf.util.shuffle(zipped_1);
                        xTensors = zipped_1.map(function (item) { return item.x; });
                        labelIndices = zipped_1.map(function (item) { return item.y; });
                    }
                    var targets = label == null ?
                        tf.cast(tf.oneHot(tf.tensor1d(labelIndices, 'int32'), vocab.length), 'float32') :
                        undefined;
                    return {
                        xs: tf.stack(xTensors),
                        ys: targets
                    };
                }
            });
        };
        Dataset.prototype.augmentByMixingNoise = function (xs, labelIndices, ratio) {
            var e_5, _a;
            if (xs == null || xs.length === 0) {
                throw new Error("Cannot perform augmentation because data is null or empty");
            }
            var isTypedArray = xs[0] instanceof Float32Array;
            var vocab = this.getVocabulary();
            var noiseExampleIndices = [];
            var wordExampleIndices = [];
            for (var i = 0; i < labelIndices.length; ++i) {
                if (vocab[labelIndices[i]] === BACKGROUND_NOISE_TAG) {
                    noiseExampleIndices.push(i);
                }
                else {
                    wordExampleIndices.push(i);
                }
            }
            if (noiseExampleIndices.length === 0) {
                throw new Error("Cannot perform augmentation by mixing with noise when " +
                    ("there is no example with label " + BACKGROUND_NOISE_TAG));
            }
            var mixedXTensors = [];
            var mixedLabelIndices = [];
            var _loop_3 = function (index) {
                var noiseIndex = // Randomly sample from the noises, with replacement.
                 noiseExampleIndices[getRandomInteger(0, noiseExampleIndices.length)];
                var signalTensor = isTypedArray ?
                    tf.tensor1d(xs[index]) :
                    xs[index];
                var noiseTensor = isTypedArray ?
                    tf.tensor1d(xs[noiseIndex]) :
                    xs[noiseIndex];
                var mixed = tf.tidy(function () { return normalize(tf.add(signalTensor, tf.mul(noiseTensor, ratio))); });
                if (isTypedArray) {
                    mixedXTensors.push(mixed.dataSync());
                }
                else {
                    mixedXTensors.push(mixed);
                }
                mixedLabelIndices.push(labelIndices[index]);
            };
            try {
                for (var wordExampleIndices_1 = __values(wordExampleIndices), wordExampleIndices_1_1 = wordExampleIndices_1.next(); !wordExampleIndices_1_1.done; wordExampleIndices_1_1 = wordExampleIndices_1.next()) {
                    var index = wordExampleIndices_1_1.value;
                    _loop_3(index);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (wordExampleIndices_1_1 && !wordExampleIndices_1_1.done && (_a = wordExampleIndices_1.return)) _a.call(wordExampleIndices_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            console.log("Data augmentation: mixing noise: added " + mixedXTensors.length + " " +
                "examples");
            mixedXTensors.forEach(function (tensor) { return xs.push(tensor); });
            labelIndices.push.apply(labelIndices, __spread(mixedLabelIndices));
        };
        Dataset.prototype.getSortedUniqueNumFrames = function () {
            var e_6, _a;
            var numFramesSet = new Set();
            var vocab = this.getVocabulary();
            for (var i = 0; i < vocab.length; ++i) {
                var label = vocab[i];
                var ids = this.label2Ids[label];
                try {
                    for (var ids_2 = (e_6 = void 0, __values(ids)), ids_2_1 = ids_2.next(); !ids_2_1.done; ids_2_1 = ids_2.next()) {
                        var id = ids_2_1.value;
                        var spectrogram = this.examples[id].spectrogram;
                        var numFrames = spectrogram.data.length / spectrogram.frameSize;
                        numFramesSet.add(numFrames);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (ids_2_1 && !ids_2_1.done && (_a = ids_2.return)) _a.call(ids_2);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            var uniqueNumFrames = __spread(numFramesSet);
            uniqueNumFrames.sort();
            return uniqueNumFrames;
        };
        /**
         * Remove an example from the `Dataset`.
         *
         * @param uid The UID of the example to remove.
         * @throws Error if the UID doesn't exist in the `Dataset`.
         */
        Dataset.prototype.removeExample = function (uid) {
            if (!(uid in this.examples)) {
                throw new Error("Nonexistent example UID: " + uid);
            }
            var label = this.examples[uid].label;
            delete this.examples[uid];
            var index = this.label2Ids[label].indexOf(uid);
            this.label2Ids[label].splice(index, 1);
            if (this.label2Ids[label].length === 0) {
                delete this.label2Ids[label];
            }
        };
        /**
         * Set the key frame index of a given example.
         *
         * @param uid The UID of the example of which the `keyFrameIndex` is to be
         *   set.
         * @param keyFrameIndex The desired value of the `keyFrameIndex`. Must
         *   be >= 0, < the number of frames of the example, and an integer.
         * @throws Error If the UID and/or the `keyFrameIndex` value is invalid.
         */
        Dataset.prototype.setExampleKeyFrameIndex = function (uid, keyFrameIndex) {
            if (!(uid in this.examples)) {
                throw new Error("Nonexistent example UID: " + uid);
            }
            var spectrogram = this.examples[uid].spectrogram;
            var numFrames = spectrogram.data.length / spectrogram.frameSize;
            tf.util.assert(keyFrameIndex >= 0 && keyFrameIndex < numFrames &&
                Number.isInteger(keyFrameIndex), function () { return "Invalid keyFrameIndex: " + keyFrameIndex + ". " +
                ("Must be >= 0, < " + numFrames + ", and an integer."); });
            spectrogram.keyFrameIndex = keyFrameIndex;
        };
        /**
         * Get the total number of `Example` currently held by the `Dataset`.
         *
         * @returns Total `Example` count.
         */
        Dataset.prototype.size = function () {
            return Object.keys(this.examples).length;
        };
        /**
         * Get the total duration of the `Example` currently held by `Dataset`,
         *
         * in milliseconds.
         *
         * @return Total duration in milliseconds.
         */
        Dataset.prototype.durationMillis = function () {
            var durMillis = 0;
            var DEFAULT_FRAME_DUR_MILLIS = 23.22;
            for (var key in this.examples) {
                var spectrogram = this.examples[key].spectrogram;
                var frameDurMillis = spectrogram.frameDurationMillis | DEFAULT_FRAME_DUR_MILLIS;
                durMillis +=
                    spectrogram.data.length / spectrogram.frameSize * frameDurMillis;
            }
            return durMillis;
        };
        /**
         * Query whether the `Dataset` is currently empty.
         *
         * I.e., holds zero examples.
         *
         * @returns Whether the `Dataset` is currently empty.
         */
        Dataset.prototype.empty = function () {
            return this.size() === 0;
        };
        /**
         * Remove all `Example`s from the `Dataset`.
         */
        Dataset.prototype.clear = function () {
            this.examples = {};
        };
        /**
         * Get the list of labels among all `Example`s the `Dataset` currently holds.
         *
         * @returns A sorted Array of labels, for the unique labels that belong to all
         *   `Example`s currently held by the `Dataset`.
         */
        Dataset.prototype.getVocabulary = function () {
            var vocab = new Set();
            for (var uid in this.examples) {
                var example = this.examples[uid];
                vocab.add(example.label);
            }
            var sortedVocab = __spread(vocab);
            sortedVocab.sort();
            return sortedVocab;
        };
        /**
         * Serialize the `Dataset`.
         *
         * The `Examples` are sorted in the following order:
         *   - First, the labels in the vocabulary are sorted.
         *   - Second, the `Example`s for every label are sorted by the order in
         *     which they are added to this `Dataset`.
         *
         * @param wordLabels Optional word label(s) to serialize. If specified, only
         *   the examples with labels matching the argument will be serialized. If
         *   any specified word label does not exist in the vocabulary of this
         *   dataset, an Error will be thrown.
         * @returns A `ArrayBuffer` object amenable to transmission and storage.
         */
        Dataset.prototype.serialize = function (wordLabels) {
            var e_7, _a, e_8, _b;
            var vocab = this.getVocabulary();
            tf.util.assert(!this.empty(), function () { return "Cannot serialize empty Dataset"; });
            if (wordLabels != null) {
                if (!Array.isArray(wordLabels)) {
                    wordLabels = [wordLabels];
                }
                wordLabels.forEach(function (wordLabel) {
                    if (vocab.indexOf(wordLabel) === -1) {
                        throw new Error("Word label \"" + wordLabel + "\" does not exist in the " +
                            "vocabulary of this dataset. The vocabulary is: " +
                            (JSON.stringify(vocab) + "."));
                    }
                });
            }
            var manifest = [];
            var buffers = [];
            try {
                for (var vocab_2 = __values(vocab), vocab_2_1 = vocab_2.next(); !vocab_2_1.done; vocab_2_1 = vocab_2.next()) {
                    var label = vocab_2_1.value;
                    if (wordLabels != null && wordLabels.indexOf(label) === -1) {
                        continue;
                    }
                    var ids = this.label2Ids[label];
                    try {
                        for (var ids_3 = (e_8 = void 0, __values(ids)), ids_3_1 = ids_3.next(); !ids_3_1.done; ids_3_1 = ids_3.next()) {
                            var id = ids_3_1.value;
                            var artifact = serializeExample(this.examples[id]);
                            manifest.push(artifact.spec);
                            buffers.push(artifact.data);
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (ids_3_1 && !ids_3_1.done && (_b = ids_3.return)) _b.call(ids_3);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (vocab_2_1 && !vocab_2_1.done && (_a = vocab_2.return)) _a.call(vocab_2);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return serializedExamples2ArrayBuffer({ manifest: manifest, data: concatenateArrayBuffers(buffers) });
        };
        return Dataset;
    }());
    /** Serialize an `Example`. */
    function serializeExample(example) {
        var hasRawAudio = example.rawAudio != null;
        var spec = {
            label: example.label,
            spectrogramNumFrames: example.spectrogram.data.length / example.spectrogram.frameSize,
            spectrogramFrameSize: example.spectrogram.frameSize,
        };
        if (example.spectrogram.keyFrameIndex != null) {
            spec.spectrogramKeyFrameIndex = example.spectrogram.keyFrameIndex;
        }
        var data = example.spectrogram.data.buffer.slice(0);
        if (hasRawAudio) {
            spec.rawAudioNumSamples = example.rawAudio.data.length;
            spec.rawAudioSampleRateHz = example.rawAudio.sampleRateHz;
            // Account for the fact that the data are all float32.
            data = concatenateArrayBuffers([data, example.rawAudio.data.buffer]);
        }
        return { spec: spec, data: data };
    }
    /** Deserialize an `Example`. */
    function deserializeExample(artifact) {
        var spectrogram = {
            frameSize: artifact.spec.spectrogramFrameSize,
            data: new Float32Array(artifact.data.slice(0, 4 * artifact.spec.spectrogramFrameSize *
                artifact.spec.spectrogramNumFrames))
        };
        if (artifact.spec.spectrogramKeyFrameIndex != null) {
            spectrogram.keyFrameIndex = artifact.spec.spectrogramKeyFrameIndex;
        }
        var ex = { label: artifact.spec.label, spectrogram: spectrogram };
        if (artifact.spec.rawAudioNumSamples != null) {
            ex.rawAudio = {
                sampleRateHz: artifact.spec.rawAudioSampleRateHz,
                data: new Float32Array(artifact.data.slice(4 * artifact.spec.spectrogramFrameSize *
                    artifact.spec.spectrogramNumFrames))
            };
        }
        return ex;
    }
    /**
     * Encode intermediate serialization format as an ArrayBuffer.
     *
     * Format of the binary ArrayBuffer:
     *   1. An 8-byte descriptor (see above).
     *   2. A 4-byte version number as Uint32.
     *   3. A 4-byte number for the byte length of the JSON manifest.
     *   4. The encoded JSON manifest
     *   5. The binary data of the spectrograms, and raw audio (if any).
     *
     * @param serialized: Intermediate serialization format of a dataset.
     * @returns The binary conversion result as an ArrayBuffer.
     */
    function serializedExamples2ArrayBuffer(serialized) {
        var manifestBuffer = string2ArrayBuffer(JSON.stringify(serialized.manifest));
        var descriptorBuffer = string2ArrayBuffer(DATASET_SERIALIZATION_DESCRIPTOR);
        var version = new Uint32Array([DATASET_SERIALIZATION_VERSION]);
        var manifestLength = new Uint32Array([manifestBuffer.byteLength]);
        var headerBuffer = concatenateArrayBuffers([descriptorBuffer, version.buffer, manifestLength.buffer]);
        return concatenateArrayBuffers([headerBuffer, manifestBuffer, serialized.data]);
    }
    /** Decode an ArrayBuffer as intermediate serialization format. */
    function arrayBuffer2SerializedExamples(buffer) {
        tf.util.assert(buffer != null, function () { return 'Received null or undefined buffer'; });
        // Check descriptor.
        var offset = 0;
        var descriptor = arrayBuffer2String(buffer.slice(offset, DATASET_SERIALIZATION_DESCRIPTOR.length));
        tf.util.assert(descriptor === DATASET_SERIALIZATION_DESCRIPTOR, function () { return "Deserialization error: Invalid descriptor"; });
        offset += DATASET_SERIALIZATION_DESCRIPTOR.length;
        // Skip the version part for now. It may be used in the future.
        offset += 4;
        // Extract the length of the encoded manifest JSON as a Uint32.
        var manifestLength = new Uint32Array(buffer, offset, 1);
        offset += 4;
        var manifestBeginByte = offset;
        offset = manifestBeginByte + manifestLength[0];
        var manifestBytes = buffer.slice(manifestBeginByte, offset);
        var manifestString = arrayBuffer2String(manifestBytes);
        var manifest = JSON.parse(manifestString);
        var data = buffer.slice(offset);
        return { manifest: manifest, data: data };
    }
    /**
     * Get valid windows in a long snippet.
     *
     * Each window is represented by an inclusive left index and an exclusive
     * right index.
     *
     * @param snippetLength Long of the entire snippet. Must be a positive
     *   integer.
     * @param focusIndex Optional. If `null` or `undefined`, an array of
     *   evenly-spaced windows will be generated. The array of windows will
     *   start from the first possible location (i.e., [0, windowLength]).
     *   If not `null` or `undefined`, must be an integer >= 0 and < snippetLength.
     * @param windowLength Length of each window. Must be a positive integer and
     *   <= snippetLength.
     * @param windowHop Hops between successsive windows. Must be a positive
     *   integer.
     * @returns An array of [beginIndex, endIndex] pairs.
     */
    function getValidWindows(snippetLength, focusIndex, windowLength, windowHop) {
        tf.util.assert(Number.isInteger(snippetLength) && snippetLength > 0, function () {
            return "snippetLength must be a positive integer, but got " + snippetLength;
        });
        if (focusIndex != null) {
            tf.util.assert(Number.isInteger(focusIndex) && focusIndex >= 0, function () {
                return "focusIndex must be a non-negative integer, but got " + focusIndex;
            });
        }
        tf.util.assert(Number.isInteger(windowLength) && windowLength > 0, function () { return "windowLength must be a positive integer, but got " + windowLength; });
        tf.util.assert(Number.isInteger(windowHop) && windowHop > 0, function () { return "windowHop must be a positive integer, but got " + windowHop; });
        tf.util.assert(windowLength <= snippetLength, function () { return "windowLength (" + windowLength + ") exceeds snippetLength " +
            ("(" + snippetLength + ")"); });
        tf.util.assert(focusIndex < snippetLength, function () { return "focusIndex (" + focusIndex + ") equals or exceeds snippetLength " +
            ("(" + snippetLength + ")"); });
        if (windowLength === snippetLength) {
            return [[0, snippetLength]];
        }
        var windows = [];
        if (focusIndex == null) {
            // Deal with the special case of no focus frame:
            // Output an array of evenly-spaced windows, starting from
            // the first possible location.
            var begin = 0;
            while (begin + windowLength <= snippetLength) {
                windows.push([begin, begin + windowLength]);
                begin += windowHop;
            }
            return windows;
        }
        var leftHalf = Math.floor(windowLength / 2);
        var left = focusIndex - leftHalf;
        if (left < 0) {
            left = 0;
        }
        else if (left + windowLength > snippetLength) {
            left = snippetLength - windowLength;
        }
        while (true) {
            if (left - windowHop < 0 || focusIndex >= left - windowHop + windowLength) {
                break;
            }
            left -= windowHop;
        }
        while (left + windowLength <= snippetLength) {
            if (focusIndex < left) {
                break;
            }
            windows.push([left, left + windowLength]);
            left += windowHop;
        }
        return windows;
    }
    /**
     * Calculate an intensity profile from a spectrogram.
     *
     * The intensity at each time frame is caclulated by simply averaging all the
     * spectral values that belong to that time frame.
     *
     * @param spectrogram The input spectrogram.
     * @returns The temporal profile of the intensity as a 1D tf.Tensor of shape
     *   `[numFrames]`.
     */
    function spectrogram2IntensityCurve(spectrogram) {
        return tf.tidy(function () {
            var numFrames = spectrogram.data.length / spectrogram.frameSize;
            var x = tf.tensor2d(spectrogram.data, [numFrames, spectrogram.frameSize]);
            return tf.mean(x, -1);
        });
    }
    /**
     * Get the index to the maximum intensity frame.
     *
     * The intensity of each time frame is calculated as the arithmetic mean of
     * all the spectral values belonging to that time frame.
     *
     * @param spectrogram The input spectrogram.
     * @returns The index to the time frame containing the maximum intensity.
     */
    function getMaxIntensityFrameIndex(spectrogram) {
        return tf.tidy(function () { return tf.argMax(spectrogram2IntensityCurve(spectrogram)); });
    }

    /** @license See the LICENSE file. */
    // This code is auto-generated, do not modify this file!
    var version = '0.5.4';

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
    var UNKNOWN_TAG = '_unknown_';
    // Key to the local-storage item that holds a map from model name to word
    // list.
    var SAVED_MODEL_METADATA_KEY = 'tfjs-speech-commands-saved-model-metadata';
    var SAVE_PATH_PREFIX = 'indexeddb://tfjs-speech-commands-model/';
    // Export a variable for injection during unit testing.
    // tslint:disable-next-line:no-any
    var localStorageWrapper = {
        localStorage: typeof window === 'undefined' ? null : window.localStorage
    };
    function getMajorAndMinorVersion(version$$1) {
        var versionItems = version$$1.split('.');
        return versionItems.slice(0, 2).join('.');
    }
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
            this.MODEL_URL_PREFIX = "https://storage.googleapis.com/tfjs-models/tfjs/speech-commands/v" + getMajorAndMinorVersion(version) + "/browser_fft";
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
                                            normalizedX = normalize(x);
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
                                                if (this.words[maxIndex] === BACKGROUND_NOISE_TAG ||
                                                    this.words[maxIndex] === UNKNOWN_TAG) {
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
                            this.audioDataExtractor = new BrowserFftFeatureExtractor({
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
                            return [4 /*yield*/, loadMetadataJson(this.metadataOrURL)];
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
                                            normalizedX = normalize(x);
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
                            _this.audioDataExtractor = new BrowserFftFeatureExtractor({
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
            _this.dataset = new Dataset();
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
                                            normalizedX = normalize(freqData);
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
                                            normalized = normalizeFloat32Array(concatenateFloat32Arrays(spectrogramSnippets));
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
                            _this.audioDataExtractor = new BrowserFftFeatureExtractor({
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
            var incomingDataset = new Dataset(serialized);
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
                                splits = balancedTrainValSplit(xs, ys, config.validationSplit);
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
                    tf.util.assert(this.words[NOISE_CLASS_INDEX] === BACKGROUND_NOISE_TAG, function () { return "Cannot perform evaluation when the first tag is not " +
                        ("" + BACKGROUND_NOISE_TAG); });
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
                tfjsSpeechCommandsVersion: version,
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
                        metadataMapStr = localStorageWrapper.localStorage.getItem(SAVED_MODEL_METADATA_KEY);
                        metadataMap = metadataMapStr == null ? {} : JSON.parse(metadataMapStr);
                        metadataMap[this.name] = this.getMetadata();
                        localStorageWrapper.localStorage.setItem(SAVED_MODEL_METADATA_KEY, JSON.stringify(metadataMap));
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
                                metadataMap = JSON.parse(localStorageWrapper.localStorage.getItem(SAVED_MODEL_METADATA_KEY));
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
        return "" + SAVE_PATH_PREFIX + name;
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
                            if (key.startsWith(SAVE_PATH_PREFIX)) {
                                keys.push(key.slice(SAVE_PATH_PREFIX.length));
                            }
                        }
                        return [2 /*return*/, keys];
                }
            });
        });
    }
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
                        metadataMap = JSON.parse(localStorageWrapper.localStorage.getItem(SAVED_MODEL_METADATA_KEY));
                        if (metadataMap == null) {
                            metadataMap = {};
                        }
                        if (metadataMap[name] != null) {
                            delete metadataMap[name];
                        }
                        localStorageWrapper.localStorage.setItem(SAVED_MODEL_METADATA_KEY, JSON.stringify(metadataMap));
                        return [4 /*yield*/, tf.io.removeModel(getCanonicalSavePath(name))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }

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
            return new BrowserFftSpeechCommandRecognizer(vocabulary, customModelArtifactsOrURL, customMetadataOrURL);
        }
        else if (fftType === 'SOFT_FFT') {
            throw new Error('SOFT_FFT SpeechCommandRecognizer has not been implemented yet.');
        }
        else {
            throw new Error("Invalid fftType: '" + fftType + "'");
        }
    }
    var utils = {
        concatenateFloat32Arrays: concatenateFloat32Arrays,
        normalizeFloat32Array: normalizeFloat32Array,
        normalize: normalize,
        playRawAudio: playRawAudio
    };

    exports.create = create;
    exports.utils = utils;
    exports.BACKGROUND_NOISE_TAG = BACKGROUND_NOISE_TAG;
    exports.Dataset = Dataset;
    exports.getMaxIntensityFrameIndex = getMaxIntensityFrameIndex;
    exports.spectrogram2IntensityCurve = spectrogram2IntensityCurve;
    exports.deleteSavedTransferModel = deleteSavedTransferModel;
    exports.listSavedTransferModels = listSavedTransferModels;
    exports.UNKNOWN_TAG = UNKNOWN_TAG;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
