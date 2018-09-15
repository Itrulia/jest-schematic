import {Tree, SchematicsException} from "@angular-devkit/schematics";

export const setJson = (path: string) => (obj: Object) => {
    return (host: Tree) => {
        if (!host.exists(path)) {
            throw new SchematicsException(`Could not find (${path})`);
        }

        host.overwrite(path, JSON.stringify(obj, null, 2));

        return host;
    };
};

export const getJson = (path: string) => {
    return (host: Tree) => {
        if (!host.exists(path)) {
            throw new SchematicsException(`Could not find (${path})`);
        }

        const configBuffer = host.read(path);
        const config = configBuffer!.toString();

        return JSON.parse(config);
    };
};