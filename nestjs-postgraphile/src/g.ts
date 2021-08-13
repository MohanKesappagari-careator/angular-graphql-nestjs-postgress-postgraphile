// import { Component, OnInit } from '@angular/core';
// import { Apollo, gql } from 'apollo-angular';
// import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Student } from 'src/app/Student';
// import { StudentService } from 'src/app/services/student.service';
// import { Observable } from 'rxjs';
// import * as SC from 'socketcluster-client';
// import { NotificationService } from '@progress/kendo-angular-notification';

// let socket = SC.create({
//   hostname: 'localhost',
//   port: 8002,
// });

// const GET_STUDENTS = gql`
//   query MyQuery {
//     allStudents {
//       nodes {
//         age
//         dateofbirth
//         email
//         id
//         name
//         nodeId
//       }
//     }
//   }
// `;
// const DELETE = gql`
//   mutation MyMutation($id: UUID!) {
//     deleteStudentById(input: { id: $id }) {
//       query {
//         allStudents {
//           nodes {
//             age
//             dateofbirth
//             email
//             id
//             name
//             nodeId
//           }
//         }
//       }
//     }
//   }
// `;

// const CREATE_STUDENT = gql`
//   mutation MyMutation(
//     $name: String!
//     $email: String!
//     $dateofbirth: String!
//     $age: Int!
//   ) {
//     createStudent(
//       input: {
//         student: {
//           name: $name
//           email: $email
//           dateofbirth: $dateofbirth
//           age: $age
//         }
//       }
//     ) {
//       query {
//         allStudents {
//           nodes {
//             age
//             dateofbirth
//             email
//             id
//             name
//             nodeId
//           }
//         }
//       }
//     }
//   }
// `;

// const UPDATE_STUDENT = gql`
//   mutation MyMutation(
//     $id: UUID!
//     $name: String!
//     $email: String!
//     $dateofbirth: String!
//     $age: Int!
//   ) {
//     updateStudentById(
//       input: {
//         studentPatch: {
//           age: $age
//           dateofbirth: $dateofbirth
//           email: $email
//           name: $name
//         }
//         id: $id
//       }
//     ) {
//       query {
//         allStudents {
//           nodes {
//             age
//             dateofbirth
//             email
//             id
//             name
//             nodeId
//           }
//         }
//       }
//     }
//   }
// `;
// @Component({
//   selector: 'app-student-table',
//   templateUrl: './student-table.component.html',
//   styleUrls: ['./student-table.component.css'],
// })
// export class StudentTableComponent implements OnInit {
//   public gridView!: GridDataResult;
//   public pageSize = 10;
//   public skip = 0;
//   editedRowIndex: number = 0;
//   editRow: any;
//   public opened = false;
//   items: Student[] = [];
//   form!: FormGroup;
//   userData = {
//     name: '',
//     email: '',
//     dateofbirth: '',
//   };

//   id!: string;
//   public uploadRemoveUrl = 'removeUrl';
//   public uploadSaveUrl = 'saveUrl';
//   update: boolean = false;
//   constructor(
//     private apollo: Apollo,
//     private studentService: StudentService,
//     private notificationService: NotificationService
//   ) {
//     this.loadItems();
//     this.form = new FormGroup({
//       name: new FormControl(this.userData.name, [Validators.required]),
//       email: new FormControl(this.userData.email, [Validators.required]),
//       dateofbirth: new FormControl(this.userData.dateofbirth, [
//         Validators.required,
//       ]),
//     });
//   }

//   ngOnInit(): void {
//     this.apollo
//       .watchQuery<any>({
//         query: GET_STUDENTS,
//       })
//       .valueChanges.subscribe(({ data, loading }) => {
//         this.items = data.allStudents.nodes;
//         console.log(data);
//       });
//   }
//   public pageChange(event: PageChangeEvent): void {
//     this.skip = event.skip;
//     this.loadItems();
//   }

//   private loadItems(): void {
//     this.gridView = {
//       data: this.items.slice(this.skip, this.skip + this.pageSize),
//       total: this.items.length,
//     };
//   }
//   public close() {
//     this.opened = false;
//   }

//   public open() {
//     this.opened = true;
//   }
//   removeHandler(id: any) {
//     this.apollo
//       .mutate({
//         mutation: DELETE,
//         variables: {
//           id: id.dataItem.id,
//         },
//       })
//       .subscribe((data: any) => {
//         this.items = data.data.deleteStudentById.query.allStudents.nodes;
//       });
//   }

//   public submitForm(): void {
//     console.log(this.form.value.dateofbirth);
//     let d = this.form.value.dateofbirth;
//     let year = d.getFullYear();
//     let month = d.getMonth();
//     let date = d.getDate();
//     let birth = `${year}/${month}/${date}`;
//     let today = new Date();
//     var tod = today.getFullYear();
//     let age: number = tod - year;
//     if (
//       today.getMonth() < month ||
//       (today.getMonth() == month && today.getDate() < date)
//     ) {
//       age--;
//     }
//     console.log(JSON.stringify(birth));

//     this.apollo
//       .mutate({
//         mutation: CREATE_STUDENT,
//         variables: {
//           name: this.form.value.name,
//           email: this.form.value.email,
//           dateofbirth: birth,
//           age: age,
//         },
//       })
//       .subscribe((data: any) => {
//         this.items = data.data.createStudent.query.allStudents.nodes;
//         console.log('------A', data);
//       });
//     this.close();
//   }

//   public clearForm(): void {
//     this.form.reset();
//   }

//   editHandler1(data: any) {
//     console.log('data', data);
//     this.update = true;
//     this.editRow = new FormGroup({
//       name: new FormControl(data.dataItem.name),
//       email: new FormControl(data.dataItem.email),
//       dateofbirth: new FormControl(
//         new Date(data.dataItem.dateofbirth),
//         Validators.compose([Validators.pattern('yyyy/MM/dd')])
//       ),
//     });
//     this.editedRowIndex = data.rowIndex;
//     data.sender.editRow(data.rowIndex, this.editRow);
//     console.log(this.editRow);
//   }

//   saveHandler(data: any) {
//     console.log(data);
//     let d = data.formGroup.value.dateofbirth;
//     let year = d.getFullYear();
//     let month = d.getMonth();
//     let date = d.getDate();
//     let birth = `${year}/${month}/${date}`;
//     let today = new Date();
//     var tod = today.getFullYear();
//     let age: number = tod - year;
//     if (
//       today.getMonth() < month ||
//       (today.getMonth() == month && today.getDate() < date)
//     ) {
//       age--;
//     }
//     this.apollo
//       .mutate({
//         mutation: UPDATE_STUDENT,
//         variables: {
//           id: data.dataItem.id,
//           name: data.formGroup.value.name,
//           email: data.formGroup.value.email,
//           dateofbirth: birth,
//           age: age,
//         },
//       })
//       .subscribe((data: any) => {
//         this.items = data.data.updateStudentById.query.allStudents.nodes;
//       });
//     // .subscribe()
//     data.sender.closeRow(data.rowIndex);
//   }
//   async fetchData() {
//     const query = await this.apollo.watchQuery<any>({
//       query: gql`
//         query MyQuery {
//           allStudents {
//             nodes {
//               age
//               dateofbirth
//               email
//               id
//               name
//               nodeId
//             }
//           }
//         }
//       `,
//       fetchPolicy: 'network-only',
//     });

//     await query.valueChanges.subscribe(({ data }) => {
//       this.items = data.findAllStudents;
//       this.loadItems();
//     });
//   }

//   async onUpload(event: any) {
//     event.preventDefault();
//     const file = event.files[0].rawFile;
//     console.log('f____', file);

//     await this.studentService
//       .uploadFile(file)
//       .then((data) => {
//         console.log(data);
//         setTimeout(() => {
//           this.fetchData();
//         }, 1000);
//       })
//       .catch((e) => console.log(e));
//     (async () => {
//       let channel = socket.subscribe('student');
//       for await (let data of channel) {
//         if (data) {
//           this.notificationService.show({
//             content: `Uploaded entry`,
//             hideAfter: 3000,
//             position: { horizontal: 'center', vertical: 'top' },
//             animation: { type: 'fade', duration: 900 },
//             type: { style: 'success', icon: true },
//           });
//         }
//       }
//     })();
//     (async () => {
//       let channel = socket.subscribe('studentF');
//       for await (let data of channel) {
//         if (data) {
//           this.notificationService.show({
//             content: `Uploaded Rejected`,
//             hideAfter: 3000,
//             position: { horizontal: 'center', vertical: 'top' },
//             animation: { type: 'fade', duration: 900 },
//             type: { style: 'error', icon: true },
//           });
//         }
//       }
//     })();

//     // query.then(() => {
//     //   this.fetchData();
//     // });
//   }
// }
