import React, {useMemo} from 'react'
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import {useForm} from '../../hooks/useForm'
import { useLocation } from 'react-router';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location = useLocation();
    const {q = ''} = queryString.parse(location.search);
    const [formValues, handleInputChange] = useForm({
        searchText: q
    });
    
    const {searchText} = formValues;
    const heroesFiltered = useMemo (() => getHeroesByName(q) , [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input type="text" autoComplete="off" value={searchText} onChange={handleInputChange} name="searchText" placeholder="Buscar Heroe..." className="form-control" />
                        <button type="btn" className="btn m-1 btn-outline-primary w-100">
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr />
                    {((heroesFiltered.length === 0 && q!== '') || q === '' )&& <div className="alert alert-info">
                        Search a hero
                    </div>}
                    {
                        heroesFiltered.map(hero => <HeroCard key={hero.id} {...hero} />) 
                    }
                </div>
            </div>
        </div>
    )
}
