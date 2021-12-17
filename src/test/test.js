import { generateData } from '../client/js/handler'
const { weatherData } = require('../server/server')

describe("Check for defined", () => {
    it("Check for defined", () => {
        const input = {
            city: 'New York'
        }
        expect(generateData(input)).toBeDefined()
    })

    it("Check for length = 0", () => {
        expect(weatherData.data.length).toBe(0)
    })
})