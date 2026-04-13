// import { shapes } from '~/utils';

export class RandomBag {
  #bag: number[] = [];
  #refillBag: () => number[];
  static #instance: RandomBag;

  private constructor(shapes: number[], copies: number) {
    this.#refillBag = () => this.randomizeBag(this.fillBag(shapes, copies));
    this.#bag = this.#refillBag();
  }

  private fillBag(shapes: number[], copies: number) {
    return Array.from(
      { length: copies * shapes.length },
      (_, idx) => idx % shapes.length,
    );
  }

  // Using Durstenfeld's algorithm for unbiased randomization
  private randomizeBag(bag: number[]) {
    const newBag = bag.slice();

    for (let i = newBag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newBag[i], newBag[j]] = [newBag[j], newBag[i]];
    }

    return newBag;
  }

  public static getInstance(): RandomBag {
    if (!RandomBag.#instance) {
      // Set up a standard '35-bag'
      RandomBag.createInstance(
        // [BUG] Something with Vite is causing this to fail with `shapes` being undefined
        // Array.from({ length: shapes.length - 1 }, (_, idx) => idx + 1),
        Array.from({ length: 7 }, (_, idx) => idx + 1),
        5,
      );
      // throw new Error(
      //   `Game's bag not initialized.\n  Call RandomBag.createInstance(shapes: number[], copies: number) first.`,
      // );
    }

    return this.#instance;
  }

  public static createInstance(shapes: number[], copies: number) {
    if (RandomBag.#instance) {
      console.warn(
        `Game bag already exists. \nCall getInstance() to retrieve it.`,
      );
    }

    this.#instance = new RandomBag(shapes, copies);
  }

  /**
   * Get the next shape randomly drawn from the class's bag.
   *
   * @returns {number} The next random shape
   */
  public nextShape(): number {
    if (this.#bag.length === 0) {
      this.#bag = this.#refillBag();
    }
    return this.#bag.pop()!;
  }
}

export default RandomBag.getInstance();
