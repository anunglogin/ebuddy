export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    totalAverageWeightRatings: number;
    numberOfRents: number;
    recentlyActive: number;
    created_at: Date;
    updated_at: Date;
}