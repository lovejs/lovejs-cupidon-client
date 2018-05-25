const fs = require("fs");

module.exports = ({ outputPath, extensions }) => {
    const webpack = require("webpack");
    const configuration = require("./webpack.config.js");
    const VirtualModulePlugin = require("virtual-module-webpack-plugin");

    configuration.mode = "development";
    configuration.output.path = outputPath;
    configuration.plugins.push(
        new webpack.DefinePlugin({
            __CUPIDON_EXTENSIONS__: JSON.stringify(extensions)
        })
    );

    let imports = [];
    let components = [];

    for (let extension of extensions) {
        const componentPath = extension.component;
        const componentName = extension.name;

        configuration.plugins.push(
            new VirtualModulePlugin({
                moduleName: `src/extensions/${componentName}.js`,
                contents: fs.readFileSync(componentPath).toString()
            })
        );
        imports.push(`import ${componentName} from 'extensions/${componentName}';`);
        components.push(componentName);
    }

    const indexContent = `   
${imports.join("\n")}
const components = {
    ${components.join(",\n")}
};
export default components; 
    `;

    configuration.plugins.push(
        new VirtualModulePlugin({
            moduleName: `src/extensions/index.js`,
            contents: indexContent
        })
    );

    return new Promise((resolve, reject) => {
        const compiler = webpack(configuration, (err, stats) => {
            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                return reject(err);
            }

            const info = stats.toJson();

            if (stats.hasErrors()) {
                console.error(info.errors);
                return reject(new Error("Compilation errors"));
            }

            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }

            return resolve(stats);
        });

        const watching = compiler.watch({ poll: true }, (err, stats) => {
            // Print watch/build result here...
            console.log(stats);
        });
    });
};
