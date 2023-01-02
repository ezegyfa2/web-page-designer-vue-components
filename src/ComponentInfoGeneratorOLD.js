const fs = require('fs')

writeComponentInfos()

function writeComponentInfos() {
    let path = 'D:/Projektek/laragon/www/WebDesigner/resources/js/componentInfos.js'
    let componentInfos = getComponentInfos()
    fs.writeFileSync(path, 'export default ' + JSON.stringify(componentInfos, null, 2))
    console.log('dsfsd')
}

function getComponentInfos() {
    let vuePackageFolderPath = 'D:/Projektek/Sajat/Sablonok/Node modulok/Vue'
    const indexFilePaths = fs.readdirSync(vuePackageFolderPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name.includes('vue-components'))
        .map(dirent => vuePackageFolderPath + '/' + dirent.name + '/src')
    let componentInfos = {}
    indexFilePaths.forEach(indexFilePath => {
        componentInfos = { ...componentInfos, ...getPackageComponentInfos(indexFilePath) }
    })
    return componentInfos
}

function getPackageComponentInfos(indexFilePath) {
    let indexContent = fs.readFileSync(indexFilePath + '/index.js')
    let componentDeclarations = [...indexContent.toString().matchAll('Vue.component\\(.*\\.default')]
        .map(componentDeclaration => componentDeclaration[0])
    let componentInfosParts = componentDeclarations.map(componentDeclaration => {
        let componentName = componentDeclaration.match('\'.*\',')[0].replace('\'', '').replace('\'', '').replace(',', '')
        let componentPath = componentDeclaration.match('require\\(\'.*\'\\)')[0].replace('\'', '').replace('\'', '')
            .replace('require(', '').replace(')', '').replace('./', '')
        return [
            componentName,
            indexFilePath + '/' + componentPath
        ]
    })

    let componentInfos = {}
    componentInfosParts.forEach(componentInfosPart => {
        componentInfos[componentInfosPart[0]] = componentInfosPart[1]
    });
    return componentInfos
}