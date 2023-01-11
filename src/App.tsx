import { FC, PropsWithChildren, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { decrement, increment, incrementByAmount } from 'src/store/slices/counter'
import { useGetPokemonByIdQuery } from 'src/services/pokemonApi'

interface AppProps {
    title?: string
}

const App: FC<AppProps> = ({ title = 'Hello world' }) => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    const [pokemonId, setPokemonId] = useState<number>(0)

    const getRandomPokemon = (): void => {
        const id = Math.ceil(Math.random() * 1010)
        setPokemonId(id)
    }

    useEffect(() => {
        getRandomPokemon()
    }, [])

    const { data, error, isLoading, isFetching } = useGetPokemonByIdQuery(pokemonId, {
        skip: pokemonId === 0
    })

    const PokemonBox: FC<PropsWithChildren> = ({ children }) => <div style={{ height: 150 }}>
        {children}
    </div>

    return (
        <div className="App">
            <h1>{title}</h1>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
                <a href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer">
                    <img src="/redux-toolkit.svg" className="logo reduxToolkit" alt="Redux Toolkit logo" />
                </a>
                <a href="https://www.typescriptlang.org" target="_blank" rel="noreferrer">
                    <img src="/typescript.svg" className="logo typescript" alt="Typescript logo" />
                </a>
                <a href="https://cypress.io" target="_blank" rel="noreferrer">
                    <img src="/cypress.png" className="logo cypress" alt="cypress logo" />
                </a>
                <a href="https://testing-library.com/" target="_blank" rel="noreferrer">
                    <img src="/react-testing-library.png" className="logo reactTestingLibrary" alt="React Testing Library logo" />
                </a>
                <a href="https://eslint.org/" target="_blank" rel="noreferrer">
                    <img src="/eslint.png" className="logo eslint" alt="ESLint logo" />
                </a>
            </div>
            <h2>Vite + React + Redux Toolkit + TypeScript + Cypress + RTL + ESLint</h2>
            <div className="card">
                <button onClick={() => dispatch(incrementByAmount(-10))} style={{
                    backgroundColor: '#fbe39b',
                    color: '#1a1a1a'
                }} data-testid="minus-10">
              -10
                </button>&nbsp;
                <button onClick={() => dispatch(decrement())} style={{
                    backgroundColor: '#ffe28b',
                    color: '#1a1a1a'
                }} data-testid="minus-1">
              -
                </button>&nbsp;
                <button onClick={() => dispatch(increment())} style={{
                    backgroundColor: '#ffd75c',
                    color: '#1a1a1a'
                }} data-testid="plus-1">
              +
                </button>&nbsp;
                <button onClick={() => dispatch(incrementByAmount(10))} style={{
                    backgroundColor: '#ffc927',
                    color: '#1a1a1a'
                }} data-testid="plus-10">
              +10
                </button>&nbsp;
                <h3>Counter {count}</h3>
            </div>
            <>
                <button onClick={getRandomPokemon} style={{
                    backgroundColor: '#b840fe',
                    color: '#fff'
                }} data-testid="random-pokemon-button">
            Random Pokemon from API
                </button>
                {(error != null)
                    ? (
                        <>Oh no, there was an error</>
                    )
                    : (isLoading || isFetching)
                        ? (
                            <PokemonBox>
                                <h3>Loading...</h3>
                            </PokemonBox>
                        )
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                        : data
                            ? (
                                <PokemonBox>
                                    <h3>
                                        {data.species.name} [{data.id}]
                                    </h3>
                                    <img src={data.sprites.front_shiny} alt={data.species.name} />
                                </PokemonBox>
                            )
                            : <>NO DATA</>}
            </>
        </div>
    )
}

export default App
