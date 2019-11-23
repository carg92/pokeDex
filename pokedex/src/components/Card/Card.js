import React from "react";

function Card({ pokemon }) {
    let img = pokemon.sprites.front_default;
    return (
        <div className="Card">
            <div className="Card__img">
                <img src={img} alt=""></img>
            </div>
            <div className="Card_name">
                Nombre:  {pokemon.name}
            </div>
            <div className="Card_types"> Tipos:
                {pokemon.types.map(type => {
                return <div className="Card_type">{type.type.name}</div>
            })}
            </div>
            <div className="Card_info">
                <div className="Card_data Card_data--weight">
                    <p className="title">Peso:</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="Card_data Card_data--height">
                    <p className="title">Altura:</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="Card_data Card_data--ability">
                    <div> Habilidades:
                    {pokemon.abilities.map(ability => {
                        return <p className="title">{ability.ability.name} </p>
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;