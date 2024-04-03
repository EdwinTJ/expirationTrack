export interface Cabinet {
    id: string;
    user_id: string;
    name: string;
    description: string;
}

export interface Item {
    id: string;
    name: string;
    expiration_date: Date;
    quantity: number;
    created_at: Date;
    cabinet_id: bigint;
}