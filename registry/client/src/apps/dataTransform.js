export function transformGet(app) {
    app.id = app.name;
    if (app.dependencies) {
        app.dependencies = Object.keys(app.dependencies).map(key => ({
            key,
            value: app.dependencies[key]
        }));
    }
    if (app.props) {
        app.props = JSON.stringify(app.props);
    }
    if (app.initProps) {
        app.initProps = JSON.stringify(app.initProps);
    }
}

export function transformSet(app) {
    if (app.props) {
        app.props = JSON.parse(app.props);
    }
    if (app.initProps) {
        app.initProps = JSON.parse(app.initProps);
    }
    if (app.dependencies) {
        app.dependencies = app.dependencies.reduce((acc, v) => {
            acc[v.key] = v.value;
            return acc;
        }, {})
    }
    delete app.id;
    delete app.assetsDiscoveryUpdatedAt;
}