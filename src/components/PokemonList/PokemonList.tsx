import { IPokemon } from '../../App'

interface Props {
  pokemonData: IPokemon[]
}

const PokemonList = ({ pokemonData }: Props) => {
  if (!pokemonData) return null

  return (
    <div className='flex flex-col items-center w-full max-w-[700px]'>
      {/* Header */}
      <div className='flex gap-2 items-center justify-center h-10 mb-6'>
        <h4 className='font-bold'>All Pokemon</h4>
      </div>
      {/* Pokemon list */}
      <ul className='text-left grid grid-cols-[repeat(auto-fill,minmax(100px,300px))] gap-8 items-center justify-center justify-items-center w-full'>
        {pokemonData.map((pokemon: IPokemon, index: number) => (
          <li
            key={pokemon.name}
            className='flex items-center gap-2 min-w-[250px] justify-center'
          >
            {/* Pokemon image and number */}
            <div className='w-24 h-24 rounded-full bg-neutral-700 p-2 flex items-center justify-center relative mr-auto'>
              {/* Pokemon image */}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                  index + 1
                }.svg`}
                alt={pokemon.name}
                loading='lazy'
                className='w-16 h-16 rounded-full object-cover overflow-visible'
              />
              {/* Pokemon number */}
              <div className='absolute left-0 top-0 w-7 h-7 bg-red-500 rounded-full z-10 flex items-center justify-center'>
                {index + 1}
              </div>
            </div>
            {/* Pokemon name */}
            <div className='capitalize mr-auto'>{pokemon.name}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
