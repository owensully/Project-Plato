import sys

# converts from base-16 to base-10
def hex2rgb(hexColour):
    return int(hexColour[0:2], 16), int(hexColour[2:4], 16), int(hexColour[4:6], 16)

# adds a variable amount of colour to range of greys
def tint(grey, rgbColour, tintStrength):
    tintedGrey = []

    midDistanceNormalized = abs(grey - 128) / 128
    midtoneFactor = 1 - midDistanceNormalized

    for colour in rgbColour:
        tintOffset = colour - grey
        adjustedColour = grey + tintOffset * tintStrength
        adjustedColour = round(adjustedColour)
        adjustedColour = max(0, min(255, adjustedColour))
        tintedGrey.append(adjustedColour)

    return tuple(tintedGrey)

hexInput = sys.argv[1].lstrip('#')
tintStrength = float(sys.argv[2]) if len(sys.argv) > 2 else 0.1

colour = hex2rgb(hexInput)
greys = [0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF]

tintedColours = []
for grey in greys:
    red, green, blue = tint(grey, colour, tintStrength)
    tintedColours.append((red, green, blue))
    print(f"#{grey:02X}{grey:02X}{grey:02X} #{red:02X}{green:02X}{blue:02X} \033[48;2;{red};{green};{blue}m \033[0m")

greyKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
greyScaleLines = '\n'.join(
    f"  grey{key}: '#{red:02X}{green:02X}{blue:02X}',"
    for key, (red, green, blue) in zip(greyKeys, tintedColours)
)

tsContent = f"""/*
Colour Palette for #{hexInput.upper()} at {int(tintStrength * 100)}% tint.
*/

export const tintColour = '#{hexInput.upper()}'

const greyScale = {{
{greyScaleLines}
}};

export const lightGreys = {{
  black: greyScale.grey0,
  white: greyScale.greyF,

  grey0: greyScale.grey7,
  grey1: greyScale.grey9,
  grey2: greyScale.greyB,
  grey3: greyScale.greyD,
}}

export const darkGreys = {{
  black: greyScale.grey0,
  white: greyScale.greyF,

  grey0: greyScale.grey2,
  grey1: greyScale.grey4,
  grey2: greyScale.grey6,
  grey3: greyScale.grey8,
}}"""

filename = f"{hexInput.upper()}-{tintStrength}-palette.ts"
with open(filename, 'w') as file:
    file.write(tsContent)
