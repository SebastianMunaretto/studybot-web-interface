export namespace StudybotApi {
  export type Grades = {
    subject: string,
    absences: number,
    averageSemester: number,
    grades: {
      grade: number,
      weight: number,
      type: string,
      date: Date,
      description: string
    }[],
  }[]

  export type User = {
    discord: {
      id: string,
      username: string,
      discriminator: string,
      avatarUrl: string,
    },
    digreg?: {
      firstName: string,
      lastName: string,
      fullName: string,
      isOver18: boolean,
      id: number,
      role: string,
      classId: number,
      className: string
    }
  }

  export type StudyTimer = {
    studyTime: number,
    breakTime: number
  }

  export type TodoItem = {
    title: string,
    description?: string,
    done: boolean,
    dueDate?: Date
    id: string
  }

  export type TodoList = TodoItem[]

}
