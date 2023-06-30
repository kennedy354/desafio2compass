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

export function deletarTutor(id:any, req: Request, res: Response){
    
    for(let i=0; i<tutors.length; i++){
        if(tutors[i].id == id){
            tutors.splice(i, 1)
            return res.json({message: "O Tutor foi deletado"})
        }
    }
    return res.json({message: "O Tutor com esse id não foi encontrado"})
}

export function criarPet(tutorid:any, req: Request, res: Response){
    try {
        const newPet = req.body
        const camposObrigatorios = [
            "name",
            "species",
            "carry",
            "weight",
            "date_of_birth",
          ];
          for (const field of camposObrigatorios) {
            if (!newPet[field]) {
              return res
                .status(400)
                .json({ error: `Campo ausente: ${field}`});
            }
          }
          for(let i=0; i<tutors.length; i++){
            if(tutors[i].id == tutorid){
                tutors[i].pets.push(newPet)
                return res.json(tutors[i])
            }
        }
        return res.json({message: "O Tutor com esse id não foi encontrado"})
    } catch (error) {
        return res.json(error)
    }
}

export function atualizarPet(petid:any, tutorid:any, req: Request, res: Response){
    const petUpdate = req.body
    const tutorCheck = tutors.find((tutorCheck:any) => tutorCheck.id === parseInt(tutorid))
    if (!tutorCheck){
        return res.status(404).json({error:"O Tutor com esse id não foi encontrado"})
    }
    const petCheck = tutorCheck.pets.find((petCheck:any) => petCheck.id === parseInt(petid))
    if (!petCheck) {
        return res.status(404).json({error:"O Pet com esse id não foi encontrado"})
    }
    Object.assign(petCheck, petUpdate)
    return res.json(petCheck)
}

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