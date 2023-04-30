<template lang="pug">
    include Template.pug
</template>

<script>
    import Refresher from '../../../helper-vue-components/src/Refresher.vue'

    export default {
        mixins: [
            Refresher,
        ],
        props: {
            template: {
                type: Object
            },
            saved_template_names: {
                type: Array,
                default() {
                    return ['edit','save','input']
                }
            }
        },
        data() {
            return {
                rows: [],
                computedDesignerInfos: [],
                template_name: '',
                error: [],
                copyObject: {},
                selectedObjs: [],
                selectedTemplates: {
                    name: '',
                    content: ''},
                parentChildConnection: 0,
                childTemplates: []
            }
        },
        mounted() {
            console.log(this.isCoherentSelection([this.template, this.template]))
            this.computedDesignerInfos = this.getComponentInfos(this.template, 0, 0)
            this.copyObject = this.copyTemplate(this.template)
            this.rows = this.getRows()
            this.updateConnectors()
        },
        updated() {
            console.log('designer updated')
            //this.rows = this.getRows()
            this.computedDesignerInfos.forEach(designerComponentInfo => {
                //this.updateSubComponentConnectors(designerComponentInfo.x, designerComponentInfo.y)
            })
            //this.rows = this.getRows()
        },
        computed: {
            tableWidth() {
                return 'width: ' + (this.columnCount * 30) + 'rem'
            },
            sectionClassName() {
                return 'line' + this._uid
            }
        },
        watch: {
            template: {
                immediate: true,
                deep: true,
                handler(newTemplate) {
                    console.log(newTemplate)
                },
                flush: 'sync'
            }
        },
        methods: {
            getRows() {
                let rows = []
                let rowCount = this.getRowCount()
                let columnCount = this.getColumnCount()
                for (let y = 0; y < rowCount; ++y) {
                    rows.push([])
                    for (let x = 0; x < columnCount; ++x) {
                        rows[y].push(this.getComponentDesignerInfo(x, y))
                    }
                }
                return rows
            },
            getRowCount() {
                let maxY = 0
                this.computedDesignerInfos.forEach(designerInfo => {
                    if (designerInfo.y > maxY) {
                        maxY = designerInfo.y
                    }
                })
                return maxY + 1
            },
            getColumnCount() {
                let maxX = 0
                this.computedDesignerInfos.forEach(designerInfo => {
                    if (designerInfo.x > maxX) {
                        maxX = designerInfo.x
                    }
                })
                return maxX + 1
            },
            getComponentDesignerInfo(x, y) {
                for (let designerInfo of this.computedDesignerInfos) {
                    if (designerInfo.x == x && designerInfo.y == y) {
                        return designerInfo
                    }
                }
                return {}
            },
            getComponentInfos(template, x, y) {
                let designerComponentInfos = []
                if (template && template.type && template.type != '') {
                    designerComponentInfos.push({
                        template: template,
                        x: x,
                        y: y
                    })
                    Object.keys(getComponentPropertyInfos(template.type).properties).forEach(propertyName => {
                        if (template.data[propertyName] && isSectionPropertyName(propertyName)) {
                            if (Array.isArray(template.data[propertyName])) {
                                template.data[propertyName].forEach(templateProperty => {
                                    let subComponentInfos = this.getComponentInfos(templateProperty, x + 1, y + 1)
                                    x += subComponentInfos.length
                                    designerComponentInfos.push(...subComponentInfos)
                                })
                            }
                            else {
                                let subComponentInfos = this.getComponentInfos(template.data[propertyName], x + 1, y + 1)
                                x += subComponentInfos.length
                                designerComponentInfos.push(...subComponentInfos)
                            }
                        }
                    })
                }
                return designerComponentInfos
            },
            updateConnectors() {
                executeAfterCondition(() => {
                    document.querySelector('#app').querySelectorAll('hr.' + this.sectionClassName).forEach(line => {
                        document.querySelector('#app').removeChild(line)
                    })
                    this.computedDesignerInfos.forEach(designerComponentInfo => {
                        this.updateSubComponentConnectors(designerComponentInfo.x, designerComponentInfo.y)
                    })
                },
                () => {
                    return this.rows.length == this.$el.querySelectorAll('tr').length
                })
            },
            updateSubComponentConnectors(x, y) {
                if (this.$el.querySelectorAll('tr').length == this.rows.length) {
                    let componentDesignerCell = this.getComponentDesignerCell(x, y)
                    let sectionElements = this.getSectionElements(componentDesignerCell)
                    let currentCellX = x
                    for (let i = 0; i < sectionElements.length; ++i) {
                        currentCellX = this.getNextCell(currentCellX, y + 1)
                        document.querySelector('#app').appendChild(this.getHorizontallyLine(i, currentCellX - x, sectionElements, componentDesignerCell))
                        document.querySelector('#app').appendChild(this.getVerticallyLine(i, currentCellX - x, sectionElements, componentDesignerCell))
                        ++currentCellX
                    }
                }
            },
            getNextCell(currentCellX, y) {
                while (currentCellX < this.rows[y].length) {
                    if (this.rows[y][currentCellX].template) {
                        return currentCellX
                    }
                    else {
                        ++currentCellX
                    }
                }
                throw new Error('Can\'t find next cell')
            },
            getHorizontallyLine(sectionElementNumber, cellToSkipCount, sectionElements, componentDesignerCell) {
                let sectionElement = sectionElements[sectionElementNumber]
                let line = this.createLine()
                line.style.left = componentDesignerCell.offsetLeft + sectionElement.offsetLeft + sectionElement.offsetWidth + 'px'
                line.style.top = this.$el.querySelector('table').offsetTop + componentDesignerCell.offsetTop + sectionElement.offsetTop + sectionElement.offsetHeight / 2 + 'px'
                line.style.width = (cellToSkipCount + 0.5) * componentDesignerCell.offsetWidth - sectionElement.offsetLeft - sectionElement.offsetWidth + 'px'
                return line
            },
            getVerticallyLine(sectionElementNumber, cellToSkipCount, sectionElements, componentDesignerCell) {
                let sectionElement = sectionElements[sectionElementNumber]
                let line = this.createLine()
                let top = this.$el.querySelector('table').offsetTop + componentDesignerCell.offsetTop + sectionElement.offsetTop + sectionElement.offsetHeight / 2
                let padding = parseFloat(window.getComputedStyle(componentDesignerCell)['padding-top'].replace('px', ''))
                let width = componentDesignerCell.offsetHeight - sectionElement.offsetTop - sectionElement.offsetHeight / 2 + padding
                line.style.width = width + 'px'
                line.style.left = componentDesignerCell.offsetLeft + (cellToSkipCount + 0.5) * componentDesignerCell.offsetWidth + 'px'
                line.style.top = top + 'px'
                line.style.transform = 'rotate(90deg) translateX(50%) translateY(' + width / 2 + 'px)'
                return line
            },
            getSectionElements(componentDesignerCell) {
                return Array.from(componentDesignerCell.querySelectorAll('.section')).filter(section => {
                    return section.querySelector('.selected') != null
                })
            },
            getComponentDesignerCell(x, y) {
                return this.$el.querySelectorAll('tr')[y].querySelectorAll('td')[x]
            },
            createLine() {
                let line = document.createElement("hr")
                line.style.position = 'absolute'
                line.style.backgroundColor = 'black'
                line.style.margin = '0'
                line.className = this.sectionClassName
                return line
            },
            sectionChanged() {
                //this.refresh()
                console.log('designer section change')
                this.computedDesignerInfos = this.getComponentInfos(this.template, 0, 0)
                this.rows = this.getRows()
                this.updateConnectors()
            },
            sendTemplate() {
                axios.post(window.location.href, {
                    'designedTemplate': JSON.stringify(this.template)
                })
            },
            copyTemplate(template) {
                return JSON.parse(JSON.stringify(template))
            },
            createTemplate() {
                console.log(JSON.parse(JSON.stringify(this.getSelectedTemplates())))
                console.log(this.isCoherentSelection(this.getSelectedTemplates()))
            },
            getSelectedTemplates() {
                return this.getSelectedSubTemplates(this.template)
            },
            getSelectedSubTemplates(template) {
                let result = []
                if (Array.isArray(template)) {
                    template.map((item) => {
                        result.push(...this.getSelectedSubTemplates(item))
                    })
                } 
                else if (typeof template === 'object' && template !== null) {
                    const templateIsRealTemplate = 'type' in template || 'template_type_name' in template

                    if (templateIsRealTemplate) {
                        if ('selected' in template && template.selected === true) {
                            result.push(template)
                        }
                    }
                    for (const [key, value] of Object.entries(template)) {
                        result.push(...this.getSelectedSubTemplates(template[key]))
                    }
                }
                return result
            },
            removeTemplateChilds(templates) {
                if (Array.isArray(templates)) {
                    let templatesCopy = new Array()
                    templates.forEach(function (elem, index) {
                        if (typeof elem === 'object' && elem !== null) {
                            let templateCopy = JSON.parse(JSON.stringify(elem))
                            if (typeof templateCopy['data'] !== 'undefined') {
                                for (const [key, value] of Object.entries(templateCopy.data)) {
                                    if ('type' !== key && 'template_type_name' !== key && value !== null) {
                                        delete templateCopy['data'][key]
                                    }
                                }
                            }
                            templatesCopy.push(templateCopy)
                        }
                    })
                    return templatesCopy
                }
                else {
                    throw new Error('Templates parameter must be array: ' + JSON.stringify(templates))
                }
            },
            isCoherentSelection(templates) {
                this.childTemplates = []
                if (Array.isArray(templates)) {
                    for (let i = 0; i < templates.length; i++) {
                        for (let j = 0; j < templates.length; j++) {
                            if (this.isChildTemplate(templates[i], templates[j])) {
                                this.childTemplates.push(templates[i])
                            }
                        }
                    }
                    return this.childTemplates.length == templates.length - 1
                }
                else {
                    throw new Error('Templates parameter must be array: ' + JSON.stringify(templates))
                }
            },
            isChildTemplate(childTemplate, parentTemplate) {
                if (parentTemplate['data']) {
                    for (const [key, dataValue] of Object.entries(parentTemplate['data'])) {
                        if (this.isSimilarData(childTemplate, dataValue)) {
                            return true
                        }
                    }
                }
                else {
                    return false
                }
            },
            isSimilarData(childTemplate, parentTemplateDataValue) {
                if (this.childTemplates.includes(childTemplate)) {
                    return false
                }
                else if (Array.isArray(parentTemplateDataValue)) {
                    for (let subDataValue of parentTemplateDataValue) {
                        if (this.isSimilarData(childTemplate, subDataValue)) {
                            return true
                        }
                    }
                    return false
                }
                else {
                    return childTemplate === parentTemplateDataValue
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "Style.scss";
</style>
