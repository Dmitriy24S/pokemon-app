import { useCallback, useState } from 'react'
import { FiRefreshCcw } from 'react-icons/fi'
import { IPokemon } from '../../App'

const makeSixRandomPokemonIds = () =>
  [...Array(6).keys()].map((_el) => Math.floor(Math.random() * 151))

interface Props {
  pokemonData: IPokemon[]
}

const RandomPokemon = ({ pokemonData }: Props) => {
  const [sixRandomPokemonsIds, setSixRandomPokemonsIds] = useState<number[]>(
    pokemonData ? makeSixRandomPokemonIds() : []
  )

  const sixRandomPokemon = sixRandomPokemonsIds.map(
    (randomNumber) => pokemonData[randomNumber]
  )

  const updateSixRandomPokemonIds = useCallback(() => {
    setSixRandomPokemonsIds(makeSixRandomPokemonIds())
  }, [])

  // useEffect(() => {
  //   if (!pokemonData) return
  //   updateSixRandomPokemonIds()
  // }, [pokemonData, updateSixRandomPokemonIds])

  if (!pokemonData) return null

  return (
    <div className='flex flex-col items-center'>
      {/* Header */}
      <div className='flex gap-2 items-center justify-center h-10 mb-6'>
        <h4 className='font-bold'>Random Pokemon</h4>
        {/* Randomize button */}
        <button
          aria-label='refresh'
          title='refresh'
          onClick={updateSixRandomPokemonIds}
          className='p-1.5 text-indigo-500 rounded-md transition hover:text-indigo-400 focus-visible:text-indigo-400'
        >
          <FiRefreshCcw />
        </button>
      </div>
      {/* Six random pokemon */}
      <ul className='text-left justify-center items-center gap-8 max-w-[700px] grid grid-cols-[repeat(auto-fill,minmax(100px,300px))] justify-items-center '>
        {sixRandomPokemon.length > 0 &&
          sixRandomPokemonsIds?.map((number, index) => (
            <li key={index} className='flex items-center gap-2 min-w-[250px]'>
              {/* Image + pokemon number circle */}
              <div className='w-24 h-24 rounded-full bg-neutral-700 p-2 flex items-center justify-center relative mr-auto'>
                {/* Pokemon image */}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                    number + 1
                  }.svg`}
                  alt={sixRandomPokemon[index].name}
                  loading='lazy'
                  className='w-16 h-16 rounded-full object-cover overflow-visible'
                />
                {/* Pokemon number */}
                <div className='absolute left-0 top-0 w-7 h-7 bg-red-500 rounded-full z-10 flex items-center justify-center'>
                  {number + 1}
                </div>
              </div>
              {/* Name */}
              <p className='capitalize mr-auto'>{sixRandomPokemon[index].name}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default RandomPokemon
