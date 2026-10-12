import { setThemeMode, tailwind } from '../tailwind';

describe('tailwind modes', () => {
  afterEach(() => setThemeMode('day'));

  it('paints Day as ink on paper, with no accent colour', () => {
    setThemeMode('day');
    expect(tailwind.style('bg-white')).toEqual({ backgroundColor: '#F8F7F2' });
    expect(tailwind.color('blue-800')).toBe('#111111');
    expect(tailwind.color('ruby-900')).not.toBe('#111111');
    expect(tailwind.style('rounded-lg')).toHaveProperty('borderRadius');
    expect(tailwind.style('font-inter-420-20')).toEqual({ fontFamily: 'Inter-420-20' });
  });

  it('paints Night as lit windows with square corners and Inter Tight', () => {
    setThemeMode('night');
    expect(tailwind.color('gray-950')).toBe('#121212');
    expect(tailwind.color('blue-800')).toBe('#121212');
    expect(tailwind.style('rounded-[26px] bg-white')).toEqual({ backgroundColor: '#F8F7F2' });
    expect(tailwind.style('rounded-t-[13px]')).toEqual({});
    expect(tailwind.style('font-inter-580-24')).toEqual({ fontFamily: 'InterTight-700' });
    expect(tailwind.style('font-vt323')).toEqual({ fontFamily: 'VT323' });
  });

  it('returns the same squared object for the same classes', () => {
    setThemeMode('night');
    expect(tailwind.style('rounded-lg p-2')).toBe(tailwind.style('rounded-lg p-2'));
  });
});
