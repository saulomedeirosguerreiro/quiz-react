export interface IQuestion{
    difficulty: 'easy' | 'medium' | 'hard';
    chosen_answer:string;
    correct_answer:string;
    isHit: boolean;
}

export interface ICategory{
    id: number;
    name:string;
    questions: Array<IQuestion>;
    hits: number;
    miss:number;
}

export interface IQuizState{
    categories: Array<ICategory>;
}

