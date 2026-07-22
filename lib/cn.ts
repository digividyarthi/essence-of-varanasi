// Tiny clsx-style class joiner — keeps the bundle lean.

export function cn(...inputs: (string | undefined | false | null)[]): string {
  return inputs.filter(Boolean).join(' ');
}
