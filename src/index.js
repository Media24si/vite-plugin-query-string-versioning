import fs from 'fs';

export default function queryStringVersioning() {
    let config = {}
    return {
        name: 'query-string-versioning',
        configResolved(resolvedConfig) {
            config = resolvedConfig
        },
        outputOptions(outputOptions) {
            outputOptions.entryFileNames = 'assets/[name].js?v=[hash]';
            outputOptions.chunkFileNames = 'assets/[name].js?v=[hash]';
            outputOptions.assetFileNames = 'assets/[name].[ext]?v=[hash]';

            return outputOptions
        },
        writeBundle(options, bundle) {
            for (let file in bundle) {
                fs.renameSync(
                    config.build.outDir + '/' + bundle[file].fileName,
                    config.build.outDir + '/' + bundle[file].fileName.replace(/\?v=.*$/, '')
                )
                bundle[file].fileName = bundle[file].fileName.replace(/\?v=.*$/, '');
            }
        },
    }
}