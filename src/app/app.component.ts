import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentService } from './students.service';
import { Student } from './student';
import { AsyncPipe, CurrencyPipe, DatePipe, LowerCasePipe, NgFor, PercentPipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { PercentagePipe } from './percentage.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, UpperCasePipe, LowerCasePipe, DatePipe, PercentPipe, CurrencyPipe, PercentagePipe, FormsModule, FilterPipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [StudentService]
})
export class AppComponent implements OnInit {
  title = 'AngularPipes';
  students!: Student[];
  totalMarks!: number;
  _filterText: string = '';
  filteredStudents!: Student[];
  totalStudents = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(this.filteredStudents.length);
    }, 2000);
  });

  get filterText(){
    return this._filterText;
  }

  set filterText(value: string){
    this._filterText = value;
    this.filteredStudents = this.filterStudentByGender(value);
  }

  constructor(private studentService: StudentService){

  }

  ngOnInit(): void {
      this.students = this.studentService.students;
      this.totalMarks = this.studentService.totalMarks;
      this.filteredStudents = this.students;
  }

  AddDummyStudent(){
      // let studentCopy: Student[] = Object.assign([], this.students);
      // studentCopy.push({name: 'TEST', course: 'TEST', marks: 520, DOB: new Date(), gender: 'Female'});
      // this.students = studentCopy;
      this.students.push({name: 'TEST', course: 'TEST', marks: 520, DOB: new Date(), gender: 'Female'});
      this.filteredStudents = this.filterStudentByGender(this._filterText);
  }

  ChangeGender(){
    // let studentCopy: Student[] = Object.assign([], this.students);
    // studentCopy[0].gender = 'Female';
    // this.students = studentCopy;
    this.students[0].gender = 'Female';
    this.filteredStudents = this.filterStudentByGender(this._filterText);
  }

  onMouseMove(){

  }

  filterStudentByGender(filterTerm: string){
    if(this.students.length === 0 || this.filterText === ''){
      return this.students;
  } else {
      return this.students.filter((student) => {
          return student.gender.toLowerCase() === filterTerm.toLowerCase()
      })
  }
  }
}
