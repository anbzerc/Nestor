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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
var jasmine_util_1 = require("@tensorflow/tfjs-core/dist/jasmine_util");
var browser_fft_extractor_1 = require("./browser_fft_extractor");
var BrowserFftUtils = require("./browser_fft_utils");
var browser_test_utils_1 = require("./browser_test_utils");
var test_utils_1 = require("./test_utils");
var testEnvs = jasmine_util_1.NODE_ENVS;
jasmine_util_1.describeWithFlags('flattenQueue', testEnvs, function () {
    it('3 frames, 2 values each', function () {
        var queue = [[1, 1], [2, 2], [3, 3]].map(function (x) { return new Float32Array(x); });
        expect(browser_fft_extractor_1.flattenQueue(queue)).toEqual(new Float32Array([1, 1, 2, 2, 3, 3]));
    });
    it('2 frames, 2 values each', function () {
        var queue = [[1, 1], [2, 2]].map(function (x) { return new Float32Array(x); });
        expect(browser_fft_extractor_1.flattenQueue(queue)).toEqual(new Float32Array([1, 1, 2, 2]));
    });
    it('1 frame, 2 values each', function () {
        var queue = [[1, 1]].map(function (x) { return new Float32Array(x); });
        expect(browser_fft_extractor_1.flattenQueue(queue)).toEqual(new Float32Array([1, 1]));
    });
});
jasmine_util_1.describeWithFlags('getInputTensorFromFrequencyData', testEnvs, function () {
    it('6 frames, 2 vals each', function () {
        var freqData = new Float32Array([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]);
        var numFrames = 6;
        var fftSize = 2;
        var tensor = browser_fft_extractor_1.getInputTensorFromFrequencyData(freqData, [1, numFrames, fftSize, 1]);
        test_utils_1.expectTensorsClose(tensor, tf.tensor4d(freqData, [1, 6, 2, 1]));
    });
});
jasmine_util_1.describeWithFlags('BrowserFftFeatureExtractor', testEnvs, function () {
    function setUpFakes() {
        spyOn(BrowserFftUtils, 'getAudioContextConstructor')
            .and.callFake(function () { return browser_test_utils_1.FakeAudioContext.createInstance; });
        spyOn(BrowserFftUtils, 'getAudioMediaStream')
            .and.callFake(function () { return new browser_test_utils_1.FakeAudioMediaStream(); });
    }
    it('constructor', function () {
        setUpFakes();
        var extractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, false];
            }); }); },
            numFramesPerSpectrogram: 43,
            columnTruncateLength: 225,
            suppressionTimeMillis: 1000,
            overlapFactor: 0
        });
        expect(extractor.fftSize).toEqual(1024);
        expect(extractor.numFrames).toEqual(43);
        expect(extractor.columnTruncateLength).toEqual(225);
        expect(extractor.overlapFactor).toBeCloseTo(0);
    });
    it('constructor errors due to null config', function () {
        expect(function () { return new browser_fft_extractor_1.BrowserFftFeatureExtractor(null); })
            .toThrowError(/Required configuration object is missing/);
    });
    it('constructor errors due to missing spectrogramCallback', function () {
        expect(function () { return new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: null,
            numFramesPerSpectrogram: 43,
            columnTruncateLength: 225,
            suppressionTimeMillis: 1000,
            overlapFactor: 0
        }); })
            .toThrowError(/spectrogramCallback cannot be null or undefined/);
    });
    it('constructor errors due to invalid numFramesPerSpectrogram', function () {
        expect(function () { return new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, false];
            }); }); },
            numFramesPerSpectrogram: -2,
            columnTruncateLength: 225,
            overlapFactor: 0,
            suppressionTimeMillis: 1000
        }); })
            .toThrowError(/Invalid value in numFramesPerSpectrogram: -2/);
    });
    it('constructor errors due to negative overlapFactor', function () {
        expect(function () { return new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, false];
            }); }); },
            numFramesPerSpectrogram: 43,
            columnTruncateLength: 225,
            overlapFactor: -0.1,
            suppressionTimeMillis: 1000
        }); })
            .toThrowError(/Expected overlapFactor/);
    });
    it('constructor errors due to columnTruncateLength too large', function () {
        expect(function () { return new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, false];
            }); }); },
            numFramesPerSpectrogram: 43,
            columnTruncateLength: 1600,
            overlapFactor: 0,
            suppressionTimeMillis: 1000
        }); })
            .toThrowError(/columnTruncateLength .* exceeds fftSize/);
    });
    it('constructor errors due to negative suppressionTimeMillis', function () {
        expect(function () { return new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, false];
            }); }); },
            numFramesPerSpectrogram: 43,
            columnTruncateLength: 1600,
            overlapFactor: 0,
            suppressionTimeMillis: -1000 // <0 and leads to Error.
        }); })
            .toThrowError(/Expected suppressionTimeMillis to be >= 0/);
    });
    it('start and stop: overlapFactor = 0', function (done) {
        setUpFakes();
        var spectrogramDurationMillis = 1024 / 44100 * 43 * 1e3;
        var numCallbacksToComplete = 3;
        var numCallbacksCompleted = 0;
        var tensorCounts = [];
        var callbackTimestamps = [];
        var extractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callbackTimestamps.push(tf.util.now());
                            if (callbackTimestamps.length > 1) {
                                expect(callbackTimestamps[callbackTimestamps.length - 1] -
                                    callbackTimestamps[callbackTimestamps.length - 2])
                                    .toBeGreaterThanOrEqual(spectrogramDurationMillis);
                            }
                            expect(x.shape).toEqual([1, 43, 225, 1]);
                            tensorCounts.push(tf.memory().numTensors);
                            if (tensorCounts.length > 1) {
                                // Assert no memory leak.
                                expect(tensorCounts[tensorCounts.length - 1])
                                    .toEqual(tensorCounts[tensorCounts.length - 2]);
                            }
                            if (!(++numCallbacksCompleted >= numCallbacksToComplete)) return [3 /*break*/, 2];
                            return [4 /*yield*/, extractor.stop()];
                        case 1:
                            _a.sent();
                            done();
                            _a.label = 2;
                        case 2: return [2 /*return*/, false];
                    }
                });
            }); },
            numFramesPerSpectrogram: 43,
            columnTruncateLength: 225,
            overlapFactor: 0,
            suppressionTimeMillis: 0
        });
        extractor.start();
    });
    it('start and stop: correct rotating buffer size', function (done) {
        setUpFakes();
        var numFramesPerSpectrogram = 43;
        var columnTruncateLength = 225;
        var numCallbacksToComplete = 3;
        var numCallbacksCompleted = 0;
        var extractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () {
                var xData, i, segment, expected;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, x.data()];
                        case 1:
                            xData = _a.sent();
                            // Verify the correctness of the spectrogram data.
                            for (i = 0; i < xData.length; ++i) {
                                segment = Math.floor(i / columnTruncateLength);
                                expected = segment * 1024 + (i % columnTruncateLength) +
                                    1024 * numFramesPerSpectrogram * numCallbacksCompleted;
                                expect(xData[i]).toEqual(expected);
                            }
                            if (!(++numCallbacksCompleted >= numCallbacksToComplete)) return [3 /*break*/, 3];
                            return [4 /*yield*/, extractor.stop()];
                        case 2:
                            _a.sent();
                            done();
                            _a.label = 3;
                        case 3: return [2 /*return*/, false];
                    }
                });
            }); },
            numFramesPerSpectrogram: numFramesPerSpectrogram,
            columnTruncateLength: columnTruncateLength,
            overlapFactor: 0,
            suppressionTimeMillis: 0
        });
        extractor.start();
    });
    it('start and stop: overlapFactor = 0.5', function (done) {
        setUpFakes();
        var numCallbacksToComplete = 5;
        var numCallbacksCompleted = 0;
        var spectrogramTensors = [];
        var callbackTimestamps = [];
        var spectrogramDurationMillis = 1024 / 44100 * 43 * 1e3;
        var numFramesPerSpectrogram = 43;
        var columnTruncateLength = 225;
        var extractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () {
                var xData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            callbackTimestamps.push(tf.util.now());
                            if (!(callbackTimestamps.length > 1)) return [3 /*break*/, 2];
                            expect(callbackTimestamps[callbackTimestamps.length - 1] -
                                callbackTimestamps[callbackTimestamps.length - 2])
                                .toBeGreaterThanOrEqual(spectrogramDurationMillis * 0.5);
                            return [4 /*yield*/, x.data()];
                        case 1:
                            xData = _a.sent();
                            expect(xData[xData.length - 1])
                                .toEqual(callbackTimestamps.length * 22 * 1024 - 800);
                            _a.label = 2;
                        case 2:
                            expect(x.shape).toEqual([1, 43, 225, 1]);
                            spectrogramTensors.push(tf.clone(x));
                            if (!(++numCallbacksCompleted >= numCallbacksToComplete)) return [3 /*break*/, 4];
                            return [4 /*yield*/, extractor.stop()];
                        case 3:
                            _a.sent();
                            done();
                            _a.label = 4;
                        case 4: return [2 /*return*/, false];
                    }
                });
            }); },
            numFramesPerSpectrogram: numFramesPerSpectrogram,
            columnTruncateLength: columnTruncateLength,
            overlapFactor: 0.5,
            suppressionTimeMillis: 0
        });
        extractor.start();
    });
    it('start and stop: the first frame is captured', function (done) {
        setUpFakes();
        var extractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () {
                var xData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            expect(x.shape).toEqual([1, 43, 225, 1]);
                            xData = x.dataSync();
                            // Verify that the first frame is not all zero or any constant value
                            // We don't compare the values against zero directly, because the
                            // spectrogram data is normalized here. The assertions below are also
                            // based on the fact that the fake audio context outputs linearly
                            // increasing sample values.
                            expect(xData[1]).toBeGreaterThan(xData[0]);
                            expect(xData[2]).toBeGreaterThan(xData[1]);
                            return [4 /*yield*/, extractor.stop()];
                        case 1:
                            _a.sent();
                            done();
                            return [2 /*return*/, false];
                    }
                });
            }); },
            numFramesPerSpectrogram: 43,
            columnTruncateLength: 225,
            overlapFactor: 0,
            suppressionTimeMillis: 0
        });
        extractor.start();
    });
    it('start and stop: suppressionTimeMillis = 1000', function (done) {
        setUpFakes();
        var numCallbacksToComplete = 2;
        var suppressionTimeMillis = 1500;
        var numCallbacksCompleted = 0;
        var extractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
            spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () {
                var tEnd;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(++numCallbacksCompleted >= numCallbacksToComplete)) return [3 /*break*/, 2];
                            tEnd = tf.util.now();
                            // Due to the suppression time, the time elapsed between the two
                            // consecutive callbacks should be longer than it.
                            expect(tEnd - tBegin).toBeGreaterThanOrEqual(suppressionTimeMillis);
                            return [4 /*yield*/, extractor.stop()];
                        case 1:
                            _a.sent();
                            done();
                            _a.label = 2;
                        case 2: return [2 /*return*/, true]; // Returning true causes suppression.
                    }
                });
            }); },
            numFramesPerSpectrogram: 43,
            columnTruncateLength: 225,
            overlapFactor: 0.25,
            suppressionTimeMillis: suppressionTimeMillis
        });
        var tBegin = tf.util.now();
        extractor.start();
    });
    it('stopping unstarted extractor leads to Error', function () { return __awaiter(_this, void 0, void 0, function () {
        var extractor, caughtError, err_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setUpFakes();
                    extractor = new browser_fft_extractor_1.BrowserFftFeatureExtractor({
                        spectrogramCallback: function (x) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, false];
                        }); }); },
                        numFramesPerSpectrogram: 43,
                        columnTruncateLength: 225,
                        overlapFactor: 0,
                        suppressionTimeMillis: 1000
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, extractor.stop()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    caughtError = err_1;
                    return [3 /*break*/, 4];
                case 4:
                    expect(caughtError.message)
                        .toMatch(/Cannot stop because there is no ongoing streaming activity/);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=browser_fft_extractor_test.js.map