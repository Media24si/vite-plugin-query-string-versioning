import fs from 'fs';

export default function queryStringVersioning() {
    return {
        name: 'query-string-versioning',
        outputOptions(outputOptions) {
            outputOptions.entryFileNames = 'assets/[name].js?v=[hash]';
            outputOptions.chunkFileNames = 'assets/[name].js?v=[hash]';
            outputOptions.assetFileNames = 'assets/[name].[ext]?v=[hash]';

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