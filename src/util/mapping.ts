import {Tree, Rule} from "@angular-devkit/schematics";
import {getJson, setJson} from "./json";

export const addMapping = (mapping: string) => (name: string, projectRoot: string, projectSource: string): Rule => {
    return (host: Tree) => {
        const json = getJson(mapping)(host);

        if (!json.moduleNames) {
            json.moduleNames = {};
        }

        if (!json.ignoreModules) {
            json.ignoreModules = ["<rootDir>/dist"];
        }

        if (!json.ignoreModules) {
            json.projects = ["<rootDir>"];
        }

        const nameRegexp = `^${name}$`;
        const nameFlatRegexp = `^${name}/(.*)$`;

        json.moduleNames = {
            ...json.moduleNames,
            [nameRegexp]: `<rootDir>/${projectSource}/public_api.ts`,
            [nameFlatRegexp]: `<rootDir>/${projectRoot}/$1/src/public_api.ts`,
        };

        json.projects = [
            ...json.projects,
            `<rootDir>/${projectRoot}`
        ];

        return setJson(mapping)(json)(host);
    }
};