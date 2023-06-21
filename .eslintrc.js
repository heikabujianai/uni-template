module.exports = {
  root: true,
  globals: {
    uni: true,
    getCurrentPages: true,
    getCurrentInstance: true,
    getApp: true,
    wx: true,
    requirePlugin: true,
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
    NodeJS: "readonly",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    'vue/max-attributes-per-line': 'off',
    "semi": [2, "always"],
    "quotes": [2, "double"],
    "quote-props": [2, "as-needed"],
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
  }
};
