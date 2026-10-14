export interface Gremio {
    id: number;
    name: string;
    description: string;
}

export interface NewGremio {
    name: string;
    description: string;
}

export type UpdateGremio = Partial<NewGremio>;