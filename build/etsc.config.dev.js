const localConfig = require('../local.config');

module.exports = {
  // Supports all esbuild.build options
  esbuild: {
    bundle: true,
    platform: 'node',
    external: ['node_modules'],
    define: {
      'process.env.NODE_ENV': '"development"',
      'process.env.ROBOT_TOKEN': `'${localConfig.telegramRobotToken}'`,
    },
    sourcemap: true,
    plugins: [
      {
        name: 'externalize-node-modules',
        setup(build) {
          build.onResolve({ filter: /^node_modules\// }, args => {
            return {
              path: args.path,
              namespace: 'external'
            };
          });
          build.onLoad({ filter: /^node_modules\// }, args => {
            if (args.path.endsWith('.js')) {
              return {
                contents: `import '${args.path}';`,
                loader: 'js'
              };
            }
          });
        }
      }
    ]
  },
};
