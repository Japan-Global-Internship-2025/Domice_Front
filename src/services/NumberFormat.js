export function stuNumToGradeANDClass(stu_num) {
    return `${String(stu_num).slice(0, 1)}학년 ${String(stu_num).slice(1, 2)}반`
}