import { isEven, isOdd } from "../src/utils";
describe('functions', () => {

    it('overloading(spoiler:you cannot do it', () => {
        function formatName(first: string, last: string, mi?: string): string {
            let fullName = `${last}, ${first}`;
            if (mi) {
                fullName += ` ${mi}.`;
            }
            return fullName;
        }


        expect(formatName('Han', 'Solo')).toBe('Solo, Han');
        expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
    });

    it('default vales for params', () => {
        function add(a: number = 2, b: number = 10): number {
            return a + b;
        }

        expect(add()).toBe(12);
        expect(add(undefined, undefined)).toBe(12);
        expect(add(10)).toBe(20);

    });
    it('rest oporator', () => {
        function add(a: number, b: number, ...rest: number[]) {
            const firstTwo = a + b;
            return rest.reduce((s, n) => s + n, firstTwo);
        }

        expect(add(2, 2)).toBe(4);
        expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
    });
    describe('higher-ordered functions', () => {
        it('an imperative tagMaker', () => {


            // <element>content</element>
            function tagMaker(element: string, content: string) {
                return `<${element}>${content}</${element}>`;
            }

            expect(tagMaker('name', 'Bob Smith')).toBe('<name>Bob Smith</name>');
            expect(tagMaker('pay', '$4,231.52')).toBe('<pay>$4,231.52</pay>');
            expect(tagMaker('pay', '$500')).toBe('<pay>$500</pay>');
            expect(tagMaker('pay', '$4')).toBe('<pay>$4</pay>');

        });

        it('an object oriented approach', () => {

            class TagMaker {
                // private element:string;

                // constructor(element: string) {
                //     this.element = element;
                // }

                constructor(private element: string) { }

                make(content: string) {
                    return `<${this.element}>${content}</${this.element}>`;
                }
            }

            const nameMaker = new TagMaker('name');
            const payMaker = new TagMaker('pay');

            expect(nameMaker.make('Bob Smith')).toBe('<name>Bob Smith</name>');
            expect(nameMaker.make('Dale Cooper')).toBe('<name>Dale Cooper</name>');
            expect(payMaker.make('$23.00')).toBe('<pay>$23.00</pay>');


        });

        it('a functional approach', () => {
            function tagMaker(element: string): (content: string) => string {
                return function (content: string) {
                    return `<${element}>${content}</${element}>`;
                }
            }

            const nameMaker = tagMaker('name');
            const payMaker = tagMaker('pay');

            expect(nameMaker('Leland')).toBe('<name>Leland</name>');
            expect(nameMaker('Harry S. Truman')).toBe('<name>Harry S. Truman</name>');
            expect(payMaker('$32.52')).toBe('<pay>$32.52</pay>');
        });

        it('function that takes a function', theFunctionalStuff);
    });
    describe('array methods', () => {

        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        it('visiting each element of an array', () => {
            numbers.forEach((e) => {
                console.log('Got', { e });

            });
            numbers.forEach((v, i, a) => console.log({ v, i, a }))
        });
        describe('array methods that return a new array', () => {
            it('has filter', () => {
                const evens = numbers.filter(isEven);
                expect(evens).toEqual([2, 4, 6, 8]);
            });
            it('has map', () => {
                //If there is a place you want to go, it'll get you there

                const asStrings = numbers.map(n => n.toString());
                expect(asStrings).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

                const doubled = numbers.map(n => n * 2);
                expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18])
            });

        });
        describe('that return a single scalar avalue', () => {

            it('checking the membership of an array against a predicate', () => {
                const allEven = numbers.every(isEven);
                expect(allEven).toBe(false);

                const someEven = numbers.some(isEven);
                expect(someEven).toBe(true);
            });
            it('reduce', () => {
                const sum = numbers.reduce((x, y) => x + y);
                expect(sum).toBe(45);

                const sum2 = numbers.reduce((s, n) => s + n, 100);
                expect(sum2).toBe(145);

            });
            it('they can be combined', () => {
                const someOfDoubleEven = numbers
                    .filter(isEven)
                    .map(n => n * 2)
                    .reduce((s, n) => s + n);
                expect(someOfDoubleEven).toBe(40);
            });
            it('tallying a shopping cart', () => {
                interface CartItems {
                    id: string;
                    description: string;
                    qty: number;
                    price: number;
                }
                const cart: CartItems[] = [
                    { id: '1', description: 'Beer', qty: 1, price: 6.99 },
                    { id: '2', description: 'shampoo', qty: 2, price: 4.50 },
                    { id: '3', description: 'Taco Shells', qty: 12, price: 1.99 }
                ];

                //const total = cart.reduce((amount: number, item: CartItems) => amount + (item.qty * item.price), 0);
                const total = cart.map(c => c.price * c.qty).reduce((s, n) => s + n);
                expect(total).toBe(39.87);
            });
            it('bowling scores', () => {
                interface BowlingGame {
                    name: string;
                    score: number;
                }
                const games: BowlingGame[] = [
                    { name: 'Jeff', score: 127 },
                    { name: 'Henry', score: 223 },
                    { name: 'Violet', score: 187 },
                    { name: 'Henry', score: 270 }
                ];
                interface Summary {
                    highScorer: string;
                    highScore: number;
                    lowScorer: string;
                    lowScore: number;
                }

                //const highScorers = games.filter(g=> g.score>=200).map(g=> `${g.name} got a ${g.score}`)

                //expect(highScorers).toBe([''])
                const initialValue: Summary = {
                    highScore: -1,
                    highScorer: null,
                    lowScore: 301,
                    lowScorer: null
                };
                const result: Summary = games.reduce((summary: Summary, next: BowlingGame) => {
                    return {
                        highScore: next.score > summary.highScore ? next.score : summary.highScore,
                        highScorer: next.score > summary.highScore ? next.name : summary.highScorer,
                        lowScore: next.score < summary.lowScore ? next.score : summary.lowScore,
                        lowScorer: next.score < summary.lowScore ? next.name : summary.lowScorer
                    }
                }, initialValue); // YOUR CODE GOES HERE


                expect(result).toEqual({
                    highScore: 270,
                    highScorer: 'Henry',
                    lowScore: 127,
                    lowScorer: 'Jeff'
                });
            });
        });
    });
    function theFunctionalStuff() {
        function formatName(first: string, last: string, decorator: (n: string) => string = (n) => n) {
            return decorator(`${last}, ${first}`);
        }

        const r1 = formatName('Han', 'Solo');
        expect(r1).toBe('Solo, Han');

        const r2 = formatName('Han', 'Solo', padForCheck);
        expect(r2).toBe('***Solo, Han***');

        const r3 = formatName('Han', 'Solo', x => x.toUpperCase());
        expect(r3).toBe('SOLO, HAN');


        function padForCheck(name: string): string {
            return '***' + name + '***';
        }
    }
})