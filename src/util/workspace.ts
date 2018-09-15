import {WorkspaceSchema} from "@angular-devkit/core/src/workspace";
import {Tree, SchematicsException} from "@angular-devkit/schematics";
import {setJson} from "./json";

export enum ProjectType {
    LIBRARY = "library",
    APPLICATION = "application"
}

export function getWorkspacePath(host: Tree): string {
    const possibleFiles = ["/angular.json", "/.angular.json"];
    const path = possibleFiles.filter(path => host.exists(path))[0];

    return path;
}

export function getWorkspace(host: Tree): WorkspaceSchema {
    const path = getWorkspacePath(host);
    const configBuffer = host.read(path);

    if (configBuffer === null) {
        throw new SchematicsException(`Could not find (${path})`);
    }

    const config = configBuffer.toString();

    return JSON.parse(config);
}

export const setWorkspace = (workspace: Object) => {
    return (host: Tree) => {
        const path = getWorkspacePath(host);

        return setJson(path)(workspace)(host);
    };
};