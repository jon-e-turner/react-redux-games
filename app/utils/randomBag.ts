export class RandomBag {
  #bag: number[] = [];
  #refillBag: () => number[];
  static #instance: RandomBag;
  static #NUM_SHAPES = 7;

  private constructor(copies: number) {
    this.#refillBag = () => this.randomizeBag(this.fillBag(copies));
    this.#bag = this.#refillBag();
  }

  private fillBag(copies: number) {
    return Array.from(
      { length: copies * RandomBag.#NUM_SHAPES },
      (_, idx) => (idx % RandomBag.#NUM_SHAPES) + 1,
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
      RandomBag.createInstance(5);
    }

    return this.#instance;
  }

  public static createInstance(copies: number) {
    if (RandomBag.#instance) {
      console.warn(
        `Game bag already exists. \nCall getInstance() to retrieve it.`,
      );
    }

    this.#instance = new RandomBag(copies);
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
