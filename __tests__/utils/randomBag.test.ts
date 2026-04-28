import { describe, expect, it } from 'vitest';
import { RandomBag } from '~/utils/randomBag';

describe('RandomBag', () => {
  const bag = RandomBag.getInstance();
  it('creates an instance when called', () => {
    expect(bag).toBeDefined();
  });

  it('creates only one instance when called', () => {
    const bag2 = RandomBag.getInstance();

    expect(bag).toBeDefined();
    expect(bag2).toBe(bag);
  });

  it('produces a bag with 5 copies of each piece', () => {
    const pieces: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

    for (let idx = 0; idx < 35; idx++) {
      const piece = bag.nextShape();
      pieces[piece]++;
    }

    expect(pieces.length).toBe(8);
    expect(pieces[0]).toBe(0);
    expect(pieces[1]).toBe(5);
    expect(pieces[2]).toBe(5);
    expect(pieces[3]).toBe(5);
    expect(pieces[4]).toBe(5);
    expect(pieces[5]).toBe(5);
    expect(pieces[6]).toBe(5);
    expect(pieces[7]).toBe(5);
  });

  it('refills automatically when empty', () => {
    const shape = bag.nextShape();

    expect(shape).toBeDefined();
    expect(shape).toBeTruthy(); // Should never be 0
  });

  it('correctly re-sets the bag when directed', () => {
    bag.resetInstance();

    expect(bag).toBeDefined();

    for (let idx = 0; idx < 90; idx++) {
      expect(bag.nextShape()).toBeTruthy();
    }
  });
});
