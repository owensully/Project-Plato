# Colour Palette

This software is used to generate `palette.ts`, the file which supplies *Project-Plato* with a colour palette.

## Usage

To generate the TypeScript palette file, run the following with your desired hex code and strength:

```
python colour-palette.py #D4AF37 0.1
```

The resulting file should include a grey scale which is tinted with your chosen colour at your chosen strength. To apply this palette, copy this file into `@/constants/` and rename to `palette.ts`.