export interface Attendance {
    id: number;
    name: string;
    description: string;
    area: string;
    state: number;
    person: string;
    problem: string;
    created_at: Date;
    updated_at: string;
    created_by: string;
    assigned_person?: string
    codigo_file?: string
}