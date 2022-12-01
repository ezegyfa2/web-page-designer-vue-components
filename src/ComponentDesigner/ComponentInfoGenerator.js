import { readdirSync, readFileSync, writeFileSync } from 'fs'

function writeComponentInfos() {
    let componentInfos = getComponentInfos()
    writeFileSync('./componentInfos', JSON.stringify(componentInfos))
}

function getComponentInfos() {
    let vuePackageFolderPath = 'D:/Projektek/Sajat/Sablonok/Node modulok/Vue'
    const getIndexFilePaths = source => readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name.includes('vue-components'))
        .map(dirent => vuePackageFolderPath + '/' + dirent.name + '/src')
    let indexFilePath = getIndexFilePaths(vuePackageFolderPath)[0]

    let indexContent = readFileSync(indexFilePath + '/index.js')
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
    let s = require(componentInfosParts[0][1])
    //console.log(s)

    let componentContent = readFileSync().toString()

    let componentInfos = {}
    componentInfosParts.forEach(componentInfosPart => {
        componentInfos[componentInfosPart[0]] = componentInfosPart[1]
    });
    return componentInfos
}
