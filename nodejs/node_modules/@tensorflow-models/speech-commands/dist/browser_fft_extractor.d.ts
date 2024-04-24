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
 * Audio FFT Feature Extractor based on Browser-Native FFT.
 */
import * as tf from '@tensorflow/tfjs-core';
import { FeatureExtractor, RecognizerParams } from './types';
export declare type SpectrogramCallback = (freqData: tf.Tensor, timeData?: tf.Tensor) => Promise<boolean>;
/**
 * Configurations for constructing BrowserFftFeatureExtractor.
 */
export interface BrowserFftFeatureExtractorConfig extends RecognizerParams {
    /**
     * Number of audio frames (i.e., frequency columns) per spectrogram.
     */
    numFramesPerSpectrogram: number;
    /**
     * Suppression period in milliseconds.
     *
     * How much time to rest (not call the spectrogramCallback) every time
     * a word with probability score above threshold is recognized.
     */
    suppressionTimeMillis: number;
    /**
     * A callback that is invoked every time a full spectrogram becomes
     * available.
     *
     * `x` is a single-example tf.Tensor instance that includes the batch
     * dimension.
     * The return value is assumed to be whether a flag for whether the
     * suppression period should initiate, e.g., when a word is recognized.
     */
    spectrogramCallback: SpectrogramCallback;
    /**
     * Truncate each spectrogram column at how many frequency points.
     *
     * If `null` or `undefined`, will do no truncation.
     */
    columnTruncateLength?: number;
    /**
     * Overlap factor. Must be >=0 and <1.
     * For example, if the model takes a frame length of 1000 ms,
     * and if overlap factor is 0.4, there will be a 400ms
     * overlap between two successive frames, i.e., frames
     * will be taken every 600 ms.
     */
    overlapFactor: number;
    /**
     * Whether to collect the raw time-domain audio waveform in addition to the
     * spectrogram.
     *
     * Default: `false`.
     */
    includeRawAudio?: boolean;
}
/**
 * Audio feature extractor based on Browser-native FFT.
 *
 * Uses AudioContext and analyser node.
 */
export declare class BrowserFftFeatureExtractor implements FeatureExtractor {
    readonly numFrames: number;
    readonly sampleRateHz: number;
    readonly fftSize: number;
    readonly columnTruncateLength: number;
    readonly overlapFactor: number;
    readonly includeRawAudio: boolean;
    private readonly spectrogramCallback;
    private stream;
    private audioContextConstructor;
    private audioContext;
    private analyser;
    private tracker;
    private freqData;
    private timeData;
    private freqDataQueue;
    private timeDataQueue;
    private frameIntervalTask;
    private frameDurationMillis;
    private suppressionTimeMillis;
    /**
     * Constructor of BrowserFftFeatureExtractor.
     *
     * @param config Required configuration object.
     */
    constructor(config: BrowserFftFeatureExtractorConfig);
    start(audioTrackConstraints?: MediaTrackConstraints): Promise<Float32Array[] | void>;
    private onAudioFrame;
    stop(): Promise<void>;
    setConfig(params: RecognizerParams): void;
    getFeatures(): Float32Array[];
}
export declare function flattenQueue(queue: Float32Array[]): Float32Array;
export declare function getInputTensorFromFrequencyData(freqData: Float32Array, shape: number[]): tf.Tensor;
/**
 * A class that manages the firing of events based on periods
 * and suppression time.
 */
export declare class Tracker {
    readonly period: number;
    readonly suppressionTime: number;
    private counter;
    private suppressionOnset;
    /**
     * Constructor of Tracker.
     *
     * @param period The event-firing period, in number of frames.
     * @param suppressionPeriod The suppression period, in number of frames.
     */
    constructor(period: number, suppressionPeriod: number);
    /**
     * Mark a frame.
     *
     * @returns Whether the event should be fired at the current frame.
     */
    tick(): boolean;
    /**
     * Order the beginning of a supression period.
     */
    suppress(): void;
}
