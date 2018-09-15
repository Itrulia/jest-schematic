import {BuilderConfiguration, BuildEvent, BuilderContext, Builder} from "@angular-devkit/architect";
import {Observable, from as fromPromise} from "rxjs";
import {mapTo} from "rxjs/operators";
import {JestBuilderSchema} from "./schema";
import {isArray} from "lodash";
const {runCLI} = require("jest");

export default class JestBuilder implements Builder<JestBuilderSchema> {
    constructor(public context: BuilderContext) {}

    public run(builderConfig: BuilderConfiguration<JestBuilderSchema>): Observable<BuildEvent> {
        const objectKeys = Object.keys(builderConfig.options);
        const options: Partial<JestBuilderSchema> = objectKeys.reduce((opt, key) => {
            const conf = builderConfig.options[key];

            if (conf !== undefined && (!isArray(conf) || conf.length)) {
                opt[key] = builderConfig.options[key];
            }

            return opt;
        }, {});

        const shell = runCLI({
            ...options,
            rootDir: options.rootDir
                ? options.rootDir
                : this.context.workspace.root,
            globals: options.globals
                ? options.globals
                : {
                    "ts-jest": {
                      tsConfigFile: options.tsConfig
                    },
                    "__TRANSFORM_HTML__": true
                  },
        }, [__dirname]);

        return fromPromise(shell).pipe(
            mapTo({success: true}),
        );
    }
}