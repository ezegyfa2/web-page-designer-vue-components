export default {
    install(Vue) {
        registerVueComponent(
            'web-designer-component-designer',
            require('./ComponentDesigner/Component.vue').default,
            Vue,
			'web-page-designer-vue-components/src/ComponentDesigner/Component.vue'
        );
        registerVueComponent(
            'web-designer-page-designer',
            require('./WebPageDesigner/Component.vue').default,
            Vue,
			'web-page-designer-vue-components/src/WebPageDesigner/Component.vue'
        );
        registerVueComponent(
            'web-designer-designed-page',
            require('./Templates/Designed/Component.vue').default,
            Vue,
			'web-page-designer-vue-components/src/Templates/Designed/Component.vue'
        );
        registerVueComponent(
            'web-designer-base-array',
            require('./BaseArray/Component.vue').default,
            Vue,
			'web-page-designer-vue-components/src/BaseArray/Component.vue'
        );

        require('./FormItems/register.js').default.install(Vue);
    },
};
