export interface crops{
    id: number;
    name: string;
    expectedyielddate: number;
    amountplanted: number;
    dateplanted: number;
}

export interface harvest{
    id: number;
    name: string;
    datharvested: number;
    amountharvested: number;
}

export interface storage{
    id: number;
    name: string;
    amountinstorage: number;
}

export interface croptasks{
    id: number;
    name: string;
    duedate: number;
}

export interface livestocktasks{
    id: number;
    name: string;
    duedate: number;
}

export interface livestock{
    id: number;
    type: 'Vaccinated' | 'Not Vaccinated' | 'Due For Vaccination';
    dob: number;
    vaccinationstat:string;
    dateplanted:number;
}

export interface produce{
    id: number;
    type: string;
    amount: number;
    datecollected: number;
}

export interface finances{
    id: number;
    type: 'Expense' | 'Income';
    amount: number;
    date: number;
}
