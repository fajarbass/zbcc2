export interface Student {
    _id:string;
    first_name: string;
    last_name: string;
}

export interface School {
    _id: string;
    correction: number;
    diff: number;
    short_name: string;
    students: number;
}

export interface Corrector {
    _id: string;
    first_name: string;
    last_name: string;
    full_name: string;
}

export interface School_Correcting_Corrector {
    _id:string;
    civility: string;
    first_name: string;
    last_name: string;
}

export interface School_Origin {
    _id: string;
    short_name: string;
}

export interface School_Correcting {
    _id: string;
    short_name: string;
}

export interface Student_Table {
    _id: string;
    status: string;
    student_id: Student;
    school_origin_id: School_Origin;
    school_correcting_id: School_Correcting;
    school_correcting_corrector_id: School_Correcting_Corrector;
    count_document: number;
}

