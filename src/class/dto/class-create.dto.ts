export class CreateClassDto {
    readonly id: number;
    readonly name: string;
    readonly capacity: number;
    readonly gradeId: number;
    readonly supervisorId: string;
}