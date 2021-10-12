/**
 * @file Babel Configuration File
 * @copyright © Copyright 2018 ABB. All rights reserved.
 */
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
            },
        ],
        '@babel/preset-react',
    ],
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs',
                        // needed to resolve async and await as per
                        // https://github.com/facebook/jest/issues/3126#issuecomment-483320742
                        // might not be needed if we use react-testing-library in the future
                        targets: {
                            node: 'current',
                        },
                    },
                ],
            ],
        },
    },
};
