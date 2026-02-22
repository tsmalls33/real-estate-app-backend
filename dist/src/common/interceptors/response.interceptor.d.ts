import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export declare class ResponseInterceptor<T> implements NestInterceptor<T, {
    code: number;
    message: string;
    data: T;
}> {
    private readonly reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<{
        code: number;
        message: string;
        data: T;
    }>;
}
