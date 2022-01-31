export function toDiceFormula (amount: number, dice: number, mod: number): string {
  const diceAverage = (dice + 1) / 2
  mod = Math.max(0, mod)
  const hpAverage = Math.floor(
    (amount * diceAverage) + mod
  )

  return `${hpAverage} (${amount}d${dice
    }${mod && mod !== 0
      ? modString(mod)
      : ""
    })`
}

export function toHitDiceFormula (hitDice?: number, amount?: number, conMod?: number): string {
  if (hitDice && amount) {
    if (conMod !== undefined) {
      const diceAverage = (hitDice + 1) / 2
      const mod = conMod > 0 ? conMod : 0
      const hpAverage = Math.floor(
        amount * (diceAverage + mod)
      )

      return `${hpAverage} (${amount}d${hitDice
        }${mod && mod !== 0
          ? modString(amount * mod)
          : ""
        })`
    } else {
      return `${amount}d${hitDice}`
    }
  }
  return ""
}

export function modString (mod?: number): string | undefined {
  if (mod !== undefined) {
    if (mod < 0) return mod.toString()
    else return `+${mod}`
  }
}

export function toMod (ability?: number): number | undefined {
  if (ability) {
    return Math.floor((ability - 10) / 2)
  }
}
