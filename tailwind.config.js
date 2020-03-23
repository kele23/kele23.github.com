/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/resolveConfig')(require('tailwindcss/defaultConfig')).theme;
const plugin = require('tailwindcss/plugin');

module.exports = {
    prefix: 'st-',
    theme: {
        fontFamily: {
            mono: ['Anonymous Pro', 'monospace']
        },
        inset: {
            '0': 0,
            auto: 'auto',
            '100': '100%',
            '-100': '-100%',
            '64': '16rem',
            '-64': '-16rem',
            '1/2': '50%',
            '-1/2': '-50%'
        },
        extend: {
            colors: {
                'regal-gray': {
                    100: '#FEFEFF',
                    200: '#FCFCFE',
                    300: '#FAFAFE',
                    400: '#F6F6FD',
                    500: '#F2F2FC',
                    600: '#DADAE3',
                    700: '#919197',
                    800: '#6D6D71',
                    900: '#49494C'
                }
            }
        },
        customForms: (theme) => ({
            default: {
                'input, textarea, multiselect, select': {
                    backgroundColor: theme('colors.gray.200'),
                    '&:focus': {
                        borderColor: defaultTheme.colors.blue[500],
                        backgroundColor: theme('colors.white')
                    }
                },
                checkbox: {
                    width: theme('spacing.6'),
                    iconColor: defaultTheme.colors.blue[700],
                    color: defaultTheme.colors.blue[500],
                    height: theme('spacing.6'),
                    '&:focus': {
                        borderColor: defaultTheme.colors.blue[500]
                    }
                },
                radio: {
                    iconColor: defaultTheme.colors.blue[700],
                    color: defaultTheme.colors.blue[500]
                }
            }
        })
    },
    variants: {
        borderWidth: ['responsive', 'hover'],
        margin: ['responsive', 'first'],
        borderColor: ['responsive', 'group-active'],
        textColor: ['responsive', 'hover', 'focus', 'group-active'],
        fontWeight: ['responsive', 'hover', 'focus', 'group-active'],
        backgroundColor: ['responsive', 'hover', 'focus', 'odd'],
        padding: ['responsive', 'hover', 'first', 'focus']
    },
    plugins: [
        require('@tailwindcss/custom-forms'),
        plugin(function({ addVariant, e, prefix }) {
            addVariant('group-active', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `${prefix(`.group`)}${prefix(`.active`)} .${e(`group-active${separator}${className}`)}`;
                });
            });
        })
        // plugin(function({ addUtilities }) {
        //     const newUtilities = {
        //         '.caret-trasparent': {
        //             caretColor: 'transparent'
        //         },
        //     };
        //     addUtilities(newUtilities);
        // })
    ]
};
