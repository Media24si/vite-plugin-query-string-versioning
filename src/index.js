import fs from 'fs';

export default function queryStringVersioning() {
    return {
        name: 'query-string-versioning',
        outputOptions(outputOptions) {
            outputOptions.entryFileNames = moveHashToQuery(outputOptions.entryFileNames);
            outputOptions.chunkFileNames = moveHashToQuery(outputOptions.chunkFileNames);
            outputOptions.assetFileNames = moveHashToQuery(outputOptions.assetFileNames);

            return outputOptions
        },
        writeBundle(options, bundle) {
            for (let file in bundle) {
                fs.renameSync(
                    'public/build/' + bundle[file].fileName,
                    'public/build/' + bundle[file].fileName.replace(/\?v=.*$/, '')
                )
                bundle[file].fileName = bundle[file].fileName.replace(/\?v=.*$/, '');
            }
        },
    }
}

function moveHashToQuery(fileName) {
    if (fileName.includes('?v=')) {
        return fileName
    }
    if (! fileName.includes('[hash')) {
        return fileName + '?v=[hash]'
    }
    const hash = fileName.match(/\[hash(\:\d+)?\]/)?.[0]
    return fileName.replace(/([._-]?\[hash(\:\d+)?\])(\[extname\]|\..+)$/, `$3?v=${hash}`)
}
