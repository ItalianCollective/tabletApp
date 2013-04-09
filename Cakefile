file = require 'file'
exec = require('child_process').exec
fs = require('fs')
path = require 'path'

String.prototype.endsWith = (suffix) ->
    return this.indexOf(suffix, this.length - suffix.length) isnt -1

buildFile = "coffeeBuild"
srcFolder = "./coffee"
pathSeparator = path.sep
destinationFile = "./js/game.js"


task "build", "build app", (options) ->
    fs.unlinkSync buildFile if fs.existsSync buildFile
    specFilePaths = []
    file.walkSync srcFolder, (dirPath, dirs, files) =>
        if files?.length > 0
            filePath = dirPath + pathSeparator
            for fileName in files when fileName.endsWith(".coffee")
                specFilePaths.push filePath + fileName
    fs.appendFileSync(buildFile, fs.readFileSync(path) + "\n\r") for path in specFilePaths

    try
        cs = require 'coffee-script'
        content = cs.compile(fs.readFileSync(buildFile, 'utf8'), {bare: true})
        fs.writeFileSync(destinationFile, content)
    catch err
        console.log err.message
        return
    fs.unlinkSync buildFile if fs.existsSync(buildFile)
    console.log "Game built in #{destinationFile}"

