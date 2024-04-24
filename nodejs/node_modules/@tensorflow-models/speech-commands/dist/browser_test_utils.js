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
/**
 * Testing Utilities for Browser Audio Feature Extraction.
 */
var FakeAudioContext = /** @class */ (function () {
    function FakeAudioContext() {
        this.sampleRate = 44100;
    }
    FakeAudioContext.createInstance = function () {
        return new FakeAudioContext();
    };
    FakeAudioContext.prototype.createMediaStreamSource = function () {
        return new FakeMediaStreamAudioSourceNode();
    };
    FakeAudioContext.prototype.createAnalyser = function () {
        return new FakeAnalyser();
    };
    FakeAudioContext.prototype.close = function () { };
    return FakeAudioContext;
}());
exports.FakeAudioContext = FakeAudioContext;
var FakeAudioMediaStream = /** @class */ (function () {
    function FakeAudioMediaStream() {
    }
    FakeAudioMediaStream.prototype.getTracks = function () {
        return [];
    };
    return FakeAudioMediaStream;
}());
exports.FakeAudioMediaStream = FakeAudioMediaStream;
var FakeMediaStreamAudioSourceNode = /** @class */ (function () {
    function FakeMediaStreamAudioSourceNode() {
    }
    FakeMediaStreamAudioSourceNode.prototype.connect = function (node) { };
    return FakeMediaStreamAudioSourceNode;
}());
var FakeAnalyser = /** @class */ (function () {
    function FakeAnalyser() {
        this.x = 0;
    }
    FakeAnalyser.prototype.getFloatFrequencyData = function (data) {
        var xs = [];
        for (var i = 0; i < this.fftSize / 2; ++i) {
            xs.push(this.x++);
        }
        data.set(new Float32Array(xs));
    };
    FakeAnalyser.prototype.getFloatTimeDomainData = function (data) {
        var xs = [];
        for (var i = 0; i < this.fftSize / 2; ++i) {
            xs.push(-(this.x++));
        }
        data.set(new Float32Array(xs));
    };
    FakeAnalyser.prototype.disconnect = function () { };
    return FakeAnalyser;
}());
//# sourceMappingURL=browser_test_utils.js.map