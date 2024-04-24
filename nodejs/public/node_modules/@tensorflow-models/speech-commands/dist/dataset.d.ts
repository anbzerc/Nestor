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
import * as tfd from '@tensorflow/tfjs-data';
import { AudioDataAugmentationOptions, Example, SpectrogramData } from './types';
export declare const DATASET_SERIALIZATION_DESCRIPTOR = "TFJSSCDS";
export declare const DATASET_SERIALIZATION_VERSION = 1;
/**
 * Specification for an `Example` (see above).
 *
 * Used for serialization of `Example`.
 */
export interface ExampleSpec {
    /** A label for the example. */
    label: string;
    /** Number of frames in the spectrogram. */
    spectrogramNumFrames: number;
    /** The length of each frame in the spectrogram. */
    spectrogramFrameSize: number;
    /** The key frame index of the spectrogram. */
    spectrogramKeyFrameIndex?: number;
    /** Number of samples in the raw PCM-format audio (if any). */
    rawAudioNumSamples?: number;
    /** Sampling rate of the raw audio (if any). */
    rawAudioSampleRateHz?: number;
}
/**
 * Serialized Dataset, containing a number of `Example`s in their
 * serialized format.
 *
 * This format consists of a plain-old JSON object as the manifest,
 * along with a flattened binary `ArrayBuffer`. The format facilitates
 * storage and transmission.
 */
export interface SerializedExamples {
    /**
     * Specifications of the serialized `Example`s, serialized as a string.
     */
    manifest: ExampleSpec[];
    /**
     * Serialized binary data from the `Example`s.
     *
     * Including the spectrograms and the raw audio (if any).
     *
     * For example, assuming `manifest.length` is `N`, the format of the
     * `ArrayBuffer` is as follows:
     *
     *   [spectrogramData1, rawAudio1 (if any),
     *    spectrogramData2, rawAudio2 (if any),
     *    ...
     *    spectrogramDataN, rawAudioN (if any)]
     */
    data: ArrayBuffer;
}
export declare const BACKGROUND_NOISE_TAG = "_background_noise_";
/**
 * Configuration for getting spectrograms as tensors.
 */
export interface GetDataConfig extends AudioDataAugmentationOptions {
    /**
     * Number of frames.
     *
     * This must be smaller than or equal to the # of frames of each
     * example held by the dataset.
     *
     * If the # of frames of an example is greater than this number,
     * the following heuristics will be used to extra >= 1 examples
     * of length numFrames from the original example:
     *
     *   - If the label of the example is `BAKCGROUND_NOISE_TAG`,
     *     the example will be splitted into multiple examples using the
     *     `hopFrames` parameter (see below).
     *   - If the label of the example is not `BACKGROUND_NOISE_TAG`,
     *     the example will be splitted into multiple examples that
     *     all contain the maximum-intensity frame using the `hopFrames`
     *     parameter.
     */
    numFrames?: number;
    /**
     * Hop length in number of frames.
     *
     * Used when splitting a long example into multiple shorter ones.
     *
     * Must be provided if any such long examples exist.
     */
    hopFrames?: number;
    /**
     * Whether the spectrogram of each example will be normalized.
     *
     * Normalization means:
     * - Subtracting the mean, and
     * - Dividing the result by the standard deviation.
     *
     * Default: `true`.
     */
    normalize?: boolean;
    /**
     * Whether the examples will be shuffled prior to merged into
     * `tf.Tensor`s.
     *
     * Default: `true`.
     */
    shuffle?: boolean;
    /**
     * Whether to obtain a `tf.data.Datasaet` object.
     *
     * Default: `false`.
     */
    getDataset?: boolean;
    /**
     * Batch size for dataset.
     *
     * Applicable only if `getDataset === true`.
     */
    datasetBatchSize?: number;
    /**
     * Validation split for the datasaet.
     *
     * Applicable only if `getDataset === true`.
     *
     * The data will be divided into two fractions of relative sizes
     * `[1 - datasetValidationSplit, datasetValidationSplit]`, for the
     * training and validation `tf.data.Dataset` objects, respectively.
     *
     * Must be a number between 0 and 1.
     * Default: 0.15.
     */
    datasetValidationSplit?: number;
}
export declare type SpectrogramAndTargetsTfDataset = tfd.Dataset<{}>;
/**
 * A serializable, mutable set of speech/audio `Example`s;
 */
export declare class Dataset {
    private examples;
    private label2Ids;
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
    constructor(serialized?: ArrayBuffer);
    /**
     * Add an `Example` to the `Dataset`
     *
     * @param example A `Example`, with a label. The label must be a non-empty
     *   string.
     * @returns The UID for the added `Example`.
     */
    addExample(example: Example): string;
    /**
     * Merge the incoming dataset into this dataset
     *
     * @param dataset The incoming dataset to be merged into this dataset.
     */
    merge(dataset: Dataset): void;
    /**
     * Get a map from `Example` label to number of `Example`s with the label.
     *
     * @returns A map from label to number of example counts under that label.
     */
    getExampleCounts(): {
        [label: string]: number;
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
    getExamples(label: string): Array<{
        uid: string;
        example: Example;
    }>;
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
    getData(label?: string, config?: GetDataConfig): {
        xs: tf.Tensor4D;
        ys?: tf.Tensor2D;
    } | [SpectrogramAndTargetsTfDataset, SpectrogramAndTargetsTfDataset];
    private augmentByMixingNoise;
    private getSortedUniqueNumFrames;
    /**
     * Remove an example from the `Dataset`.
     *
     * @param uid The UID of the example to remove.
     * @throws Error if the UID doesn't exist in the `Dataset`.
     */
    removeExample(uid: string): void;
    /**
     * Set the key frame index of a given example.
     *
     * @param uid The UID of the example of which the `keyFrameIndex` is to be
     *   set.
     * @param keyFrameIndex The desired value of the `keyFrameIndex`. Must
     *   be >= 0, < the number of frames of the example, and an integer.
     * @throws Error If the UID and/or the `keyFrameIndex` value is invalid.
     */
    setExampleKeyFrameIndex(uid: string, keyFrameIndex: number): void;
    /**
     * Get the total number of `Example` currently held by the `Dataset`.
     *
     * @returns Total `Example` count.
     */
    size(): number;
    /**
     * Get the total duration of the `Example` currently held by `Dataset`,
     *
     * in milliseconds.
     *
     * @return Total duration in milliseconds.
     */
    durationMillis(): number;
    /**
     * Query whether the `Dataset` is currently empty.
     *
     * I.e., holds zero examples.
     *
     * @returns Whether the `Dataset` is currently empty.
     */
    empty(): boolean;
    /**
     * Remove all `Example`s from the `Dataset`.
     */
    clear(): void;
    /**
     * Get the list of labels among all `Example`s the `Dataset` currently holds.
     *
     * @returns A sorted Array of labels, for the unique labels that belong to all
     *   `Example`s currently held by the `Dataset`.
     */
    getVocabulary(): string[];
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
    serialize(wordLabels?: string | string[]): ArrayBuffer;
}
/** Serialize an `Example`. */
export declare function serializeExample(example: Example): {
    spec: ExampleSpec;
    data: ArrayBuffer;
};
/** Deserialize an `Example`. */
export declare function deserializeExample(artifact: {
    spec: ExampleSpec;
    data: ArrayBuffer;
}): Example;
/** Decode an ArrayBuffer as intermediate serialization format. */
export declare function arrayBuffer2SerializedExamples(buffer: ArrayBuffer): SerializedExamples;
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
export declare function getValidWindows(snippetLength: number, focusIndex: number, windowLength: number, windowHop: number): Array<[number, number]>;
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
export declare function spectrogram2IntensityCurve(spectrogram: SpectrogramData): tf.Tensor;
/**
 * Get the index to the maximum intensity frame.
 *
 * The intensity of each time frame is calculated as the arithmetic mean of
 * all the spectral values belonging to that time frame.
 *
 * @param spectrogram The input spectrogram.
 * @returns The index to the time frame containing the maximum intensity.
 */
export declare function getMaxIntensityFrameIndex(spectrogram: SpectrogramData): tf.Scalar;
