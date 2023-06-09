import { useCallback, useEffect, useState } from 'react'
import { IPokemon } from '../../App'

const randomize = (pokemonArr: IPokemon[]): IPokemon[] =>
  pokemonArr.sort(() => 0.5 - Math.random())

const getFourRandomPokemon = (pokemonData: IPokemon[]) =>
  randomize(JSON.parse(JSON.stringify(pokemonData))).slice(0, 4)

interface Props {
  pokemonData: IPokemon[]
}

const GuessGame = ({ pokemonData }: Props) => {
  console.count('GuessGame render')
  const [firstFourRandomPokemon, setFirstFourRandomPokemon] = useState<IPokemon[]>(
    getFourRandomPokemon(pokemonData) || []
  )

  const [randomAnswerPokemon, setRandomAnswerPokemon] = useState<IPokemon | null>(
    firstFourRandomPokemon[Math.floor(Math.random() * firstFourRandomPokemon.length) || 0]
  )
  const [answerPokemonInfo, setAnswerPokemonInfo] = useState<any>(null)
  const [playerSelectedPokemon, setPlayerSelectedPokemon] = useState<IPokemon | null>(
    null
  )
  const [score, setScore] = useState(0)

  const handlePokemonClick = useCallback((pokemon: IPokemon) => {
    setPlayerSelectedPokemon(pokemon)
  }, [])

  // Initialize game - create four random pokemon
  // useEffect(() => {
  // if (!pokemonData) return
  // const pokemonDataArrCopy = JSON.parse(JSON.stringify(pokemonData))
  // setFirstFourRandomPokemon(randomize(pokemonDataArrCopy).slice(0, 4))
  // }, [pokemonData])

  // Create answer/correct pokemon
  useEffect(() => {
    setRandomAnswerPokemon(
      firstFourRandomPokemon[Math.floor(Math.random() * firstFourRandomPokemon.length)]
    )
  }, [firstFourRandomPokemon])

  // Fetch answer/correct pokemon info
  useEffect(() => {
    if (!randomAnswerPokemon) return
    const fetchPokemonInfo = async () => {
      const res = await fetch(randomAnswerPokemon?.url)
      const data = await res.json()
      setAnswerPokemonInfo(data)
    }
    fetchPokemonInfo()
  }, [randomAnswerPokemon])

  //  Check if player selected pokemon is correct: score update, next round start
  useEffect(() => {
    if (!randomAnswerPokemon || !playerSelectedPokemon) return

    if (playerSelectedPokemon.name === randomAnswerPokemon.name) {
      setScore((prevScore) => prevScore + 1)

      setTimeout(() => {
        setPlayerSelectedPokemon(null)
        setFirstFourRandomPokemon(getFourRandomPokemon(pokemonData))
      }, 1000)
    }

    if (playerSelectedPokemon.name !== randomAnswerPokemon.name) {
      setScore((prevScore) => prevScore - 1)
    }
  }, [playerSelectedPokemon, pokemonData, randomAnswerPokemon])

  if (!pokemonData) return null

  return (
    <div className='flex flex-col items-center gap-4 p-2 mb-8 relative'>
      <div className='flex flex-wrap gap-4 items-center justify-center mb-4'>
        <h4 className='font-bold '>Guess That Pokemon</h4>
        <p className='md:absolute md:top-2 md:right-4'>Score: {score}</p>
      </div>
      {/* Pokemon img / shadow  */}
      {answerPokemonInfo && (
        <div className='w-24 h-24 rounded-full bg-neutral-700 p-2 flex items-center justify-center'>
          <img
            src={answerPokemonInfo.sprites.other.dream_world.front_default}
            alt={answerPokemonInfo.name}
            className={[
              'w-16 h-16 rounded-full object-cover overflow-visible duration-75',
              randomAnswerPokemon?.name === playerSelectedPokemon?.name
                ? 'transition brightness-100'
                : 'brightness-0',
            ].join(' ')}
          />
        </div>
      )}
      {/* Guess result */}
      <div className='min-h-[30px]'>
        {playerSelectedPokemon && (
          <p
            className={[
              'font-bold',
              randomAnswerPokemon?.name === playerSelectedPokemon?.name
                ? 'text-[#3cef3b]'
                : 'text-[#ff0000]',
            ].join(' ')}
          >
            {randomAnswerPokemon?.name === playerSelectedPokemon?.name
              ? 'Correct'
              : 'Wrong'}
          </p>
        )}
      </div>
      {/* Four answer buttons */}
      <div className='flex items-center flex-wrap gap-4 justify-center '>
        {firstFourRandomPokemon.map((pokemon) => (
          <button
            key={pokemon.url}
            onClick={() => handlePokemonClick(pokemon)}
            className={[
              'flex items-center hover:bg-neutral-900 transition focus-visible:bg-neutral-900 outline min-w-[125px] w-[40%] text-center justify-center capitalize',
              pokemon?.name === playerSelectedPokemon?.name
                ? 'bg-neutral-900 outline outline-2 outline-offset-2 '
                : 'outline-2 outline-neutral-700',
              pokemon.name === playerSelectedPokemon?.name &&
                (randomAnswerPokemon?.name === playerSelectedPokemon?.name
                  ? 'outline-green-500'
                  : 'outline-red-600'),
            ].join(' ')}
            disabled={randomAnswerPokemon?.name === playerSelectedPokemon?.name}
          >
            {pokemon.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default GuessGame
