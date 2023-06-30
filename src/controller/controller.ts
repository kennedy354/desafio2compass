import express, {Express, Request, Response} from 'express'

const tutors = 
[ 
    { 
        id: 1, 
        name: "Jonh Doe", 
        phone: "85989323895", 
        email: "jose.abreu@compasso.com", 
        date_of_birth: "1993-12-12 10:10", 
        zip_code: "61760000", 
        pets: [ 
            { 
                id: 1, 
                name: "Lilo", 
                species: "dog", 
                carry: "p", 
                weight: 5,
                date_of_birth: "1993-12-12 10:10" 
            } 
        ] 
    }
    ,
    { 
        id: 2, 
        name: "Julia", 
        phone: "4002-8922", 
        email: "julia@compasso.com", 
        date_of_birth: "1980-12-12 10:10", 
        zip_code: "63540000", 
        pets: [ 
            { 
                id: 1, 
                name: "Bob", 
                species: "dog", 
                carry: "p", 
                weight: 2.5,
                date_of_birth: "2011-12-12 10:10" 
            } 
        ] 
    }
]

export function deletarPet(petid:any, tutorid:any, req: Request, res: Response){

    for(let i=0; i<tutors.length; i++){
        if(tutors[i].id == tutorid){
            for(let j=0; j<tutors[i].pets.length; j++){
                if(tutors[i].pets[j].id == petid){
                    tutors[i].pets.splice(j, 1)
                    return res.json({message: "O Pet foi deletado"})
                }
            }
            return res.json({message: "O Pet com esse id não foi encontrado"})
        }
    }
    return res.json({message: "O Tutor com esse id não foi encontrado"})
}