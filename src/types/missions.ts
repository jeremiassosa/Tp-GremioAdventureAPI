export interface Mission {
    id: number;
    title: string;
    objetive: string;
    level: number;
    gremio_id: number;
    status: boolean;
}

export interface NewMission {
    title: string;
    objetive: string;
    level: number;
    gremio_id: number;
}

export type UpdateMission = Partial<NewMission & { status: boolean }>;

export interface MissionFilters {
    title?: string;
    level?: number;
    status?: boolean;
    gremio_id?: number;
}