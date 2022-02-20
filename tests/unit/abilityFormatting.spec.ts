import { parseFormatText } from '../../src/shared/abilityFormatting'

test('displays message', () => {
  // mount() returns a wrapped Vue component we can interact with
  // const wrapper = mount(MessageComponent, {
  //   propsData: {
  //     msg: 'Hello world'
  //   }
  // })

  // Assert the rendered text of the component
  expect('wrapper.text()').toContain('Hello world')
})

describe('src/shared/abilityFormatting.ts', () => {
  describe('parseFormatText', () => {
    const text = `#Name would be #name and use $var1 and $var2 maintaining $var1. #Name would rol ^damage killing ^damage using ~a spell~ or ~another spell~. dealing ^acid. lucky ~another spell~`

    it('should match properties starting with #', () => {
      const result = parseFormatText(text)
      expect(result.properties).toHaveLength(2)
      expect(result.properties).toContain('Name')
      expect(result.properties).toContain('name')
    })

    it('should match variables starting with $', () => {
      const result = parseFormatText(text)
      expect(result.variables).toHaveLength(2)
      expect(result.variables).toContain('var1')
      expect(result.variables).toContain('var2')
    })

    it('should match formulae starting with ^', () => {
      const result = parseFormatText(text)
      expect(result.formulae).toHaveLength(2)
      expect(result.formulae).toContain('damage')
      expect(result.formulae).toContain('acid')
    })

    it('should match spells surrounded by ~', () => {
      const result = parseFormatText(text)
      expect(result.spells).toHaveLength(2)
      expect(result.spells).toContain('a spell')
      expect(result.spells).toContain('another spell')
    })
  })
})
