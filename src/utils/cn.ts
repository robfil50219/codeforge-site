// Small, dependency-free className merger.
// Supports strings, arrays, and { key: boolean } objects.
//
// Usage:
//   cn("btn", isActive && "btn-active", ["px-4", { hidden: !show }])

export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[]
  | { [klass: string]: boolean | undefined | null };

function pushToken(out: string[], token: unknown) {
  if (!token) return;
  if (typeof token === "string" || typeof token === "number") {
    out.push(String(token));
  } else if (Array.isArray(token)) {
    for (const t of token) pushToken(out, t);
  } else if (typeof token === "object") {
    for (const [k, v] of Object.entries(token as Record<string, unknown>)) {
      if (v) out.push(k);
    }
  }
}

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const i of inputs) pushToken(out, i);
  // NOTE: this does not do Tailwind conflict resolution; it just joins.
  return out.join(" ");
}

export default cn;