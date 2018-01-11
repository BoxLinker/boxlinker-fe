/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
// module.exports = {
//   "extends": "react-app",
//   plugins: ['prettier'],
// };

// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  "extends": [
    "react-app",
    'prettier',
    'prettier/react'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        // https://github.com/prettier/prettier#options
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
