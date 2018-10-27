import { apply, chain, MergeStrategy, mergeWith, Rule, SchematicContext, template, Tree, url } from "@angular-devkit/schematics";
import { strings } from "@angular-devkit/core";
import { getWorkspace, setWorkspace } from "../util/workspace";
import { SchematicsException } from "@angular-devkit/schematics";
import { addMapping } from "../util/mapping";
import { addPackage, removePackage, runNpmInstall } from "../util/package";

const PACKAGE_JSON = "package.json";

export default function(): Rule {
    const addToPackage = addPackage(PACKAGE_JSON);
    const removeFromPackage = removePackage(PACKAGE_JSON);

    return (host: Tree, context: SchematicContext): Tree => {
        const workspace = getWorkspace(host);

        if (!workspace.defaultProject) {
            throw new SchematicsException("defaultProject is not defined in angular.json.");
        }

        const project = workspace.projects[workspace.defaultProject];
        const { architect } = project;

        if (architect) {
            architect.test = {
                builder: "@itrulia/jest-schematic:test",
                options: {
                    config: `jest.config.js`,
                    tsConfig: `src/tsconfig.spec.json`,
                },
            };
        }

        return chain([
            addToPackage("devDependencies", "@types/jest", "^23.0.0"),
            addToPackage("devDependencies", "jest", "^23.0.0"),
            addToPackage("devDependencies", "jest-preset-angular", "^6.0.0"),

            removeFromPackage("devDependencies", "karma"),
            removeFromPackage("devDependencies", "karma-chrome-launcher"),
            removeFromPackage("devDependencies", "karma-coverage-istanbul-reporter"),

            runNpmInstall(),
            deleteFiles(),
            copyRootConfigFiles(),
            setWorkspace(workspace),
        ])(host, context) as Tree;
    };
}

export function addToLib(options: any): Rule {
    const addToMapping = addMapping("jest.mapper.json");

    return (host: Tree, context: SchematicContext): Tree => {
        const workspace = getWorkspace(host);

        if (!options.project) {
            throw new SchematicsException("Option (project) is required.");
        }

        const project = workspace.projects[options.project];
        const { root, sourceRoot, architect } = project;

        const [, scope, pkg] = root.split("/");
        const name = pkg ? `@${scope}/${pkg}` : scope;
        const relativeRoot = root
            .split("/")
            .map(() => "..")
            .join("/");

        if (architect) {
            architect.test = {
                builder: "@itrulia/jest-schematic:test",
                options: {
                    config: `${root}/jest.config.js`,
                    tsConfig: `${root}/tsconfig.spec.json`,
                },
            };
        }

        return chain([
            addToMapping(name, root, sourceRoot as string),
            copyProjectConfigFiles(root, {
                relativeRoot,
                name,
                pkg,
                root,
                sourceRoot,
            }),
            (host: Tree) => {
                host.delete(`${sourceRoot}/test.ts`);
                host.delete(`${root}/karma.conf.js`);

                return host;
            },
            setWorkspace(workspace),
        ])(host, context) as Tree;
    };
}

function deleteFiles() {
    return (host: Tree) => {
        host.delete("src/test.ts");
        host.delete("src/karma.conf.js");

        return host;
    };
}

function copyProjectConfigFiles(projectRoot: string, options: any = {}): Rule {
    return mergeWith(
        apply(url("./files/add"), [
            template({
                utils: strings,
                dot: ".",
                tmpl: "",
                projectRoot: projectRoot,
                ...options,
            }),
        ]),
        MergeStrategy.AllowOverwriteConflict
    );
}

function copyRootConfigFiles(): Rule {
    return mergeWith(
        apply(url("./files/init"), [
            template({
                utils: strings,
                dot: ".",
                tmpl: "",
            }),
        ]),
        MergeStrategy.AllowOverwriteConflict
    );
}
