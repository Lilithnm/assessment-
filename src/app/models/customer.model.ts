export class Customer { 
    Id?: number;
    FirstName?: string;
    LastName?: string;
    Status?: StatusListEnum;
    Email?: string;
    Phone?: string;
};

export enum StatusListEnum{
    Active,
    Pending,
    Inactive
}
