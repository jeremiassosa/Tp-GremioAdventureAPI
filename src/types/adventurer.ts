export interface Adventurer {
    id: number;
    name: string;
    level: number;
    user_id: number;
}

export interface NewAdventurer {
    name: string;
    level: number;
    user_id: number;
}

export type UpdateAdventurer = Partial<Omit<NewAdventurer, "user_id">>;

export interface AdventurerFilters {
    name?: string;
    level?: number;
}