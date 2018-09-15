import {SchematicContext, Rule, Tree} from "@angular-devkit/schematics";
import {NodePackageInstallTask} from "@angular-devkit/schematics/tasks";
import {getJson, setJson} from "./json";

export const addPackage = (packageJson: string) => (type: string, pkg: string, version: string): Rule => {
    const writeJson = setJson(packageJson);

    return (host: Tree) => {
        const json = getJson(packageJson);

        if (!json[type]) {
            json[type] = {};
        }

        if (!json[type][pkg]) {
            json[type][pkg] = version;
        }

        return writeJson(json)(host);
    };
};

export const removePackage = (packageJson: string) => (type: string, pkg: string): Rule => {
    const writeJson = setJson(packageJson);

    return (host: Tree): Tree => {
        const json = getJson(packageJson);

        if (!json[type]) {
            return host;
        }

        delete json[type][pkg];

        return writeJson(json)(host);
    };
}

export const addScript = (packageJson: string) => (key: string, command: string): Rule => {
    const writeJson = setJson(packageJson);

    return (host: Tree): Tree => {
        const json = getJson(packageJson);

        if (!json["scripts"]) {
            json["scripts"] = {};
        }

        json["scripts"] = {
            ...json["scripts"],
            [key]: command
        };

        host.overwrite(packageJson, JSON.stringify(json, null, 2));

        return writeJson(json)(host);
    };
}

export function runNpmInstall() {
    return (host: Tree, context: SchematicContext): Tree => {
        context.addTask(new NodePackageInstallTask());

        return host;
    };
}
