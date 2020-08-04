/* import { Employee } from "../src/hr/employee";
import { Retiree } from "../src/hr/retiree";
import { Contractor } from "../src/hr/contractor"; */
import * as fromHr from "../src/hr";
import { Employee } from "../src/hr";

describe('modules', () => {

    describe('using a barrel', () => {

        /* it('creating some stuff', () => {
            const emp = new fromHr.Employee();
            const ret = new fromHr.Retiree();
            const con = new fromHr.Contractor();
        }); */
        it('creating stuff', () => {
            const dale = new Employee('Dale', 'Cooper');

            dale.job = 'Special Agent';
            expect(dale.salary).toBe(80_000);
            dale.giveRaise(10_000);
            expect(dale.salary).toBe(90_000);
            expect(dale.firstName).toBe('Dale');
            expect(dale.lastName).toBe('Cooper');
            expect(dale.getInfo()).toBe('Special Agent Dale Cooper');
        });
        it('using interface', () => {
            const emp = new Employee('Gordon', 'Smith');
            emp.job = 'Boss';
            reportIt(emp);

            function reportIt(item: fromHr.Reportable) {
                console.log(item.getReport);
            }
            const newPay = getAdjustedPay(emp, 1.10);

            interface HasSalary { salary: number };
            function getAdjustedPay(item: HasSalary, percentage: number) {
                return item.salary * percentage;
            }
        });
        it('an example (sort of)', () => {
            interface Action {
                type: string;
            }
            class Increment implements Action {
                type = 'Increment'
            }
            class Decrement implements Action {
                type = 'Decrement'
            }
            class Reset implements Action {
                type = 'Reset'
            }
            const stuffThatTheUserDid: Action[] = [
                new Increment(),
                new Increment(),
                new Increment(),
                new Increment(),
                new Decrement(),
                new Decrement(),
                new Decrement(),
                new Reset(),
                new Increment(),
                new Increment(),
                new Increment(),
                new Increment(),
                new Increment(),
                new Decrement()
            ];
            const initialState = 0;
            const endCount = stuffThatTheUserDid.reduce((count: number, action: Action) => {
                switch (action.type) {
                    case 'Increment': {
                        return count + 1;
                    }
                    case 'Decrement': {
                        return count - 1;
                    }
                    case 'Reset': {
                        return initialState;
                    }
                }
            }, initialState)
            expect(endCount).toBe(4);
        });
    });
});

});