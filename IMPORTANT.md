Do not update @types/webpack-bundle-analyzer to 4.x as it requires webpack v5, which is incompatible with Gatsby v2.
Until we can upgrade Gatsby to v3 when plugin-ts-config supports it, don't do anything...

`@graphql-tools/relay-operation-optimizer` must be fixed to `6.0.12` as it's the last version which support `graphql@14` via `relay-compiler@9`.

# Deployment on Gatsby Cloud

To take advantage of `presetter`, it is recommended to make sure the site is built using node 16+ with npm 7+, by which the installation process ensures all peer dependencies from `presetter-preset` are installed.

To use node 16+, you can specify the version via the environment variable `NODE_VERSION`.
