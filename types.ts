export interface crops{
    id: number;
    name: string;
    expectedyielddate: Date;
    amountplanted: number;
    dateplanted: Date;
}

export interface harvest{
    id: number;
    name: string;
    dateharvested: Date;
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
    duedate: Date;
}

export interface livestocktasks{
    id: number;
    name: string;
    duedate: Date;
}

export interface livestock{
    id: number;
    type: string;
    dob: Date;
    vaccinationstat:'Vaccinated' | 'Not Vaccinated' | 'Due For Vaccination';
}

export interface produce{
    id: number;
    type: string;
    amount: number;
    datecollected: Date;
    unit: string;
}

export interface finances{
    id: number;
    type: 'Expense' | 'Income';
    amount: number;
    date: Date;
}
