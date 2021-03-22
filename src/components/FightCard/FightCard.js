import React from 'react'

const FightCard = ({ pokemon, score, setAction }) => {

    return (
        <div className="fight-card col-12 col-md-6">
        <p className="title">{pokemon.name} </p>


            <div className="row col-12 text-left">
                <div className="col-4">
                    <p>Score</p>
                </div>
                <div className="col-8">
                    <div  className="progress">
                        <div className="progress-bar progress-bar-striped 
                                        progress-bar-animated bg-danger" 
                            role="progressbar" 
                            style={{width: `${score}%`}}
                            aria-valuenow={score} 
                            aria-valuemin="0" 
                            aria-valuemax="200">
                            {score}
                        </div>
                    </div>
                </div>
            </div>



        <img src={
            pokemon.sprites.other.dream_world.front_default
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_default
            } alt={pokemon.name} className="card-img pb-3"/>
        
            <div className="ability-container row">
            {pokemon.stats.map((stat, index) => {
                return (
                    <div key={index} className="row col-12 text-left">
                        <div className="col-4">
                            <p>{stat.stat.name}</p>
                        </div>
                        <div className="col-8">
                            <div  className="progress">
                                <div className="progress-bar" 
                                    role="progressbar" 
                                    style={{width: `${stat.base_stat}%`}}
                                    aria-valuenow={stat.base_stat} 
                                    aria-valuemin="0" 
                                    aria-valuemax="200">
                                    {stat.base_stat}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>

        
    </div>
    )
}

export default FightCard
