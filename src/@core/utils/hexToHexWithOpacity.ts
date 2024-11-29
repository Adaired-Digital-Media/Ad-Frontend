export function hexToHexWithOpacity(hex: string, opacity: number): string {
    // Ensure opacity is within range 0 to 1
    const alpha = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
    // Remove the '#' from the hex code
    const trimmedHex = hex.startsWith("#") ? hex.slice(1) : hex;
    return `#${trimmedHex}${alpha}`;
  }