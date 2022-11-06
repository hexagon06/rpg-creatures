import { parseFormatText } from '../../src/shared/abilityFormatting'
import { expect } from 'chai'

describe('src/shared/abilityFormatting.ts', () => {
  describe('parseFormatText', () => {
    const text = `#Name would be #name and use $var1 and $var2 maintaining $var1. #Name would rol ^damage killing ^damage using ~a spell~ or ~another spell~. dealing ^acid. lucky ~another spell~`

    it('should match properties starting with #', () => {
      const result = parseFormatText(text)
      expect(result.properties).to.have.length(2)
      expect(result.properties).to.contain('Name')
      expect(result.properties).to.contain('name')
    })

    it('should match variables starting with $', () => {
      const result = parseFormatText(text)
      expect(result.variables).to.have.length(2)
      expect(result.variables).to.contain('var1')
      expect(result.variables).to.contain('var2')
    })

    it('should match formulae starting with ^', () => {
      const result = parseFormatText(text)
      expect(result.formulae).to.have.length(2)
      expect(result.formulae).to.contain('damage')
      expect(result.formulae).to.contain('acid')
    })

    it('should match spells surrounded by ~', () => {
      const result = parseFormatText(text)
      expect(result.spells).to.have.length(2)
      expect(result.spells).to.contain('a spell')
      expect(result.spells).to.contain('another spell')
    })
  })
})
