export class CreateStudentDto {
    readonly name: string;
    readonly subjects: string[];
    readonly username: string;
    readonly surname: string;
    readonly email: string;
    readonly phone: string;
    readonly address: string;
    readonly bloodType: string;
    readonly sex: string;
    readonly birthday: string;
    readonly classId: string;
    readonly gradeId: string;
    readonly parentId: string;
}