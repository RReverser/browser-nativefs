/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// @license © 2020 Google LLC. Licensed under the Apache License, Version 2.0.

/**
 * Opens a file from disk using the legacy `<input type="file">` method.
 * @param {Object} [options] - Optional options object.
 * @param {string[]} options.mimeTypes - Acceptable MIME types.
 * @param {string[]} options.extensions - Acceptable file extensions.
 * @param {boolean} options.multiple - Allow multiple files to be selected.
 * @return {File | File[]} Opened file(s).
 */
export default async (options = {}) => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    const accept = [
      ...(options.mimeTypes ? options.mimeTypes : []),
      (options.extensions ? options.extensions.map((ext) => `.${ext}`) : []),
    ].join();
    input.multiple = options.multiple || false;
    input.accept = accept || '*/*';
    input.addEventListener('change', () => {
      resolve(input.multiple ? input.files : input.files[0]);
    });
    input.click();
  });
};
