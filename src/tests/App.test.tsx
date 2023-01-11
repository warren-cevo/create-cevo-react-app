import { fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from 'src/testUtils'
import App from 'src/App'
import { server } from 'src/jestSetup'
import dummyPokemon from 'src/tests/dummyPokemon'
import { rest } from 'msw'

describe('App', function () {
    test('Should render the page', async () => {
        const { queryAllByRole, queryByText } = renderWithProviders(
            <App title="Testing Title"/>
        )

        expect(queryByText(/Testing Title/i)).toBeInTheDocument()
        expect(queryByText(/Vite \+ React/i)).toBeInTheDocument()
        expect(queryByText(/Random Pokemon from API/i)).toBeInTheDocument()

        expect(queryAllByRole('button').length).toBe(5)
    })

    test('Should display API data successful', async () => {
        const { getByAltText, queryByText } = renderWithProviders(
            <App />
        )

        expect(queryByText(/loading.../i)).toBeInTheDocument()

        await waitFor(() => {
            const rgxAlt = new RegExp(dummyPokemon.species.name, 'i')
            const image = getByAltText(rgxAlt) as HTMLImageElement
            expect(image.src).toContain(dummyPokemon.sprites.front_shiny)
            expect(getByAltText(rgxAlt)).toBeInTheDocument()
        })
    })

    test('Should respond to click actions', async () => {
        const { queryByText, getByTestId } = renderWithProviders(
            <App />
        )

        expect(queryByText(/loading.../i)).toBeInTheDocument()

        expect(queryByText(/Counter 0/i)).toBeInTheDocument()

        const plus10 = getByTestId('plus-10')
        fireEvent.click(plus10)
        expect(queryByText(/Counter 10/i)).toBeInTheDocument()

        const minus1 = getByTestId('minus-1')
        fireEvent.click(minus1)
        expect(queryByText(/Counter 9/i)).toBeInTheDocument()

        const minus10 = getByTestId('minus-10')
        fireEvent.click(minus10)
        expect(queryByText(/Counter -1/i)).toBeInTheDocument()

        const plus1 = getByTestId('plus-1')
        fireEvent.click(plus1)
        expect(queryByText(/Counter 0/i)).toBeInTheDocument()
    })

    test('Should display an error when the API request fail', async () => {
        server.use(
            rest.get('https://pokeapi.co/api/v2/pokemon/*', (_req, res, ctx) => {
                return res(ctx.status(500), ctx.json('an error has occurred'))
            })
        )

        const { getByText, queryByText } = renderWithProviders(<App />)

        expect(queryByText(/loading.../i)).toBeInTheDocument()

        await waitFor(() => {
            expect(getByText(/oh no, there was an error/i)).toBeInTheDocument()
        })

        expect(queryByText(/loading.../i)).not.toBeInTheDocument()
    })

    test('Should test empty API response', async () => {
        server.use(
            rest.get('https://pokeapi.co/api/v2/pokemon/*', (_req, res, ctx) => {
                return res(ctx.json(''))
            })
        )

        const { queryByText } = renderWithProviders(<App />)
        expect(queryByText(/Loading.../i)).toBeInTheDocument()
        await waitFor(() => {
            expect(queryByText(/NO DATA/i)).toBeInTheDocument()
        })
    })
})
