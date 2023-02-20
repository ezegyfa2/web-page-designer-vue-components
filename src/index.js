export default {
    install(Vue) {
        registerVueComponent(
            'web-designer-component-designer',
            require('./ComponentDesigner/Component.vue').default,
            Vue,
			'web-page-designer-vue-components/ComponentDesigner/Component.vue'
        );
        registerVueComponent(
            'web-designer-page-designer',
            require('./WebPageDesigner/Component.vue').default,
            Vue,
			'web-page-designer-vue-components/WebPageDesigner/Component.vue'
        );
        registerVueComponent(
            'web-designer-designed-page',
            require('./Templates/Designed/Component.vue').default,
            Vue,
			'web-page-designer-vue-components/Templates/Designed/Component.vue'
        );

        require('./FormItems/register.js').default.install(Vue);
    },
};
