### https://github.com/nestjs/nest

1.  Single Responsibility Principle (SRP) in the HttpExceptionFilter class from the Nest repository:

            `export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
                catch(exception: HttpException, host: ArgumentsHost) {
                    const ctx = host.switchToHttp();
                    const response = ctx.getResponse();
                    const request = ctx.getRequest();
                    const statusCode = exception.getStatus();
                    response.status(statusCode).json({
                        statusCode,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        });
                    }
                }
            `

        In this code, the HttpExceptionFilter class has only one responsibility - catch error and return response with error status code, path, and timestamp.

2.  Interface Segregation Principle (ISP):

    `
    export type TypeOrmModuleOptions = {
    retryAttempts?: number;
    retryDelay?: number;
    toRetry?: (err: any) => boolean;
    autoLoadEntities?: boolean;
    keepConnectionAlive?: boolean;
    verboseRetryLog?: boolean;
    } & Partial<DataSourceOptions>;

    export interface TypeOrmOptionsFactory {
    createTypeOrmOptions(
        connectionName?: string,
    ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions;
    }

    export type TypeOrmDataSourceFactory = (
    options?: DataSourceOptions,
    ) => Promise<DataSource>;

    export interface TypeOrmModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    useExisting?: Type<TypeOrmOptionsFactory>;
    useClass?: Type<TypeOrmOptionsFactory>;
    useFactory?: (
        ...args: any[]
    ) => Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions;
    dataSourceFactory?: TypeOrmDataSourceFactory;
    inject?: any[];
    extraProviders?: Provider[];
    }
    `
    TypeOrmModuleAsyncOptions may be violating the ISP, as it contains multiple properties that may not be required by all clients. However, the TypeOrmDataSourceFactory, TypeOrmModuleAsyncOptions, TypeOrmOptionsFactory,TypeOrmModuleOptions interfaces are still the good decision for separating the
    responsobility.
    

3.  Factory Method pattern + + Open-Closed Principle (OCP):

        `export abstract class AbstractAction {
            public abstract handle(
                inputs?: Input[],
                options?: Input[],
                extraFlags?: string[],
            ): Promise<void>;
        }
        `

    In this implementation, the abstract method handle of the abstract class AbstractAction provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.As for the open/closed principle, the Factory Method pattern inherently facilitates this. The code is "closed" in that it doesn't have to be modified if you add a new factory (because you're using dependency injection), and it's "open" in that you can extend the functionality by writing a new abstract factory.
    Patter is used in (add.action.ts):
    export class AddAction extends AbstractAction {
        public async handle(inputs: Input[], options: Input[], extraFlags: string[]) {
        const libraryName = this.getLibraryName(inputs);
        const packageName = this.getPackageName(libraryName);
        const collectionName = this.getCollectionName(libraryName, packageName);
        const tagName = this.getTagName(packageName);
        const skipInstall = hasValidOptionFlag('skip-install', options);
        const packageInstallSuccess = skipInstall || await this.installPackage(
        collectionName,
        tagName,
        );
        if (packageInstallSuccess) {
        const sourceRootOption: Input = await this.getSourceRoot(
            inputs.concat(options),
        );
        options.push(sourceRootOption);

        await this.addLibrary(collectionName, options, extraFlags);
        } else {
        console.error(
            chalk.red(
            MESSAGES.LIBRARY_INSTALLATION_FAILED_BAD_PACKAGE(libraryName),
            ),
        );
        throw new Error(MESSAGES.LIBRARY_INSTALLATION_FAILED_BAD_PACKAGE(libraryName));
        }
    }


4.

5.  Abstract Factory pattern + Dependency Inversion Principle (DIP):
    ``export abstract class AbstractCommand {
    constructor(protected action: AbstractAction) {}

    public abstract load(program: CommanderStatic): void;
    }
    ``

    In this implementation, abstract class AbstractCommand lets us produce families of related objects without specifying their concrete classes. In the following abstract
    factory, higher-level classes and low-level classes both depend on the abstraction.
    
    For example, 
    ``
    export class AddCommand extends AbstractCommand {
    public load(program: CommanderStatic): void {
    program
      .command('add <library>')
      .allowUnknownOption()
      .description('Adds support for an external library to your project.')
      .option(
        '-d, --dry-run',
        'Report actions that would be performed without writing out results.',
      )
      .option('-s, --skip-install', 'Skip package installation.', false)
      .option('-p, --project [project]', 'Project in which to generate files.')
      .usage('<library> [options] [library-specific-options]')
      .action(async (library: string, command: Command) => {
        const options: Input[] = [];
        options.push({ name: 'dry-run', value: !!command.dryRun });
        options.push({ name: 'skip-install', value: command.skipInstall });
        options.push({
          name: 'project',
          value: command.project,
        });

        const inputs: Input[] = [];
        inputs.push({ name: 'library', value: library });

        const flags = getRemainingFlags(program);
        try {
          await this.action.handle(inputs, options, flags);
        } catch (err) {
          process.exit(1);
        }
      });
  }
    ``
