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
export declare function concatenateArrayBuffers(buffers: ArrayBuffer[]): ArrayBuffer;
/**
 * Concatenate Float32Arrays.
 *
 * @param xs Float32Arrays to concatenate.
 * @return The result of the concatenation.
 */
export declare function concatenateFloat32Arrays(xs: Float32Array[]): Float32Array;
/** Encode a string as an ArrayBuffer. */
export declare function string2ArrayBuffer(str: string): ArrayBuffer;
/** Decode an ArrayBuffer as a string. */
export declare function arrayBuffer2String(buffer: ArrayBuffer): string;
/** Generate a pseudo-random UID. */
export declare function getUID(): string;
export declare function getRandomInteger(min: number, max: number): number;
