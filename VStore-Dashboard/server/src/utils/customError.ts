export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500
}

type CustomErrorArgs = {
    name?: string;
    httpCode: HttpCode;
    message?: string;
};

export class CustomError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;

    constructor(args: CustomErrorArgs) {
        super(args.message);
        this.name = args.name || 'Internal Server Error';
        this.httpCode = args.httpCode;
    }
}

export function throwError(httpCode: HttpCode, message?: string) {
    throw new CustomError({ httpCode, message });
}
