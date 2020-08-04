export const startingPay = 80_000;

export * from './employee';
export * from './contractor';
export * from './retiree';


export interface Reportable {
    getReport(): string
}