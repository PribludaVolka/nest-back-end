import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "admin2",
    },
  });

  const createdGrades: any = [];

  for (let i = 1; i <= 6; i++) {
    const grade = await prisma.grade.create({
      data: { level: i },
    });
    createdGrades.push(grade);
  }

  const createdClasses: any = [];
  for (let i = 1; i <= 6; i++) {
    const classItem = await prisma.class.create({
      data: {
        name: `Class ${i}`,
        gradeId: createdGrades[i % createdGrades.length].id,
        capacity: 30,
      },
    });
    createdClasses.push(classItem);
  }


  // SUBJECT
  const subjectData = [
  { name: "Mathematics" },
  { name: "Science" },
  { name: "English" },
  { name: "History" },
  { name: "Geography" },
  { name: "Physics" },
  { name: "Chemistry" },
  { name: "Biology" },
  { name: "Computer Science" },
  { name: "Art" },
];

  const createdSubjects: any = [];
  for (const subject of subjectData) {
    const created = await prisma.subject.create({ data: subject });
    createdSubjects.push(created);
  }


  const allSubjects = await prisma.subject.findMany();
  const allClasses = await prisma.class.findMany();
  for (let i = 1; i <= 15; i++) {
    const subject = allSubjects[i % allSubjects.length];
    const cls = allClasses[i % allClasses.length];

    await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: subject.id }] },
        classes: { connect: [{ id: cls.id }] },
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
      },
    });
}


  // LESSON
  const createdLessons: any = [];
  for (let i = 1; i <= 30; i++) {
    const lesson = await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[Object.keys(Day)[Math.floor(Math.random() * Object.keys(Day).length)] as keyof typeof Day],
        startTime: new Date(),
        endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        subjectId: createdSubjects[i % createdSubjects.length].id,
        classId: createdClasses[i % createdClasses.length].id,
        teacherId: `teacher${(i % 15) + 1}`,
      },
    });
    createdLessons.push(lesson);
  }


  // PARENT
  for (let i = 1; i <= 25; i++) {
    await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parentId${i}`,
        name: `PName ${i}`,
        surname: `PSurname ${i}`,
        email: `parent${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
      },
    });
  }

  // STUDENT
 for (let i = 1; i <= 50; i++) {
    await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname ${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        bloodType: "O-",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
        gradeId: createdGrades[i % createdGrades.length].id,
        classId: createdClasses[i % createdClasses.length].id,
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      },
    });
  }

  const createdExams: any = [];
  for (let i = 1; i <= 10; i++) {
    const exam = await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(),
        endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        lessonId: createdLessons[i % createdLessons.length].id,
      },
    });
    createdExams.push(exam);
  }

  const createdAssignments: any = [];
  for (let i = 1; i <= 10; i++) {
    const assignment = await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        lessonId: createdLessons[i % createdLessons.length].id,
      },
    });
    createdAssignments.push(assignment);
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90,
        studentId: `student${i}`,
        ...(i <= 5
          ? { examId: createdExams[i - 1].id }
          : { assignmentId: createdAssignments[i - 6].id }),
      },
    });
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: `student${i}`,
        lessonId: createdLessons[i % createdLessons.length].id,
      },
    });
  }


  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(),
        endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        classId: createdClasses[i % createdClasses.length].id,
      },
    });

    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: createdClasses[i % createdClasses.length].id,
      },
    });
  }


  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });