import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-freelancer-add-edit',
  templateUrl: './freelancer-add-edit.component.html',
  styleUrls: ['./freelancer-add-edit.component.scss']
})
export class FreelancerAddEditComponent implements OnInit {
  freelancerForm: FormGroup;
  skillsets: string[] = [
    'Web Dev', 
    'Mobile App Dev', 
    'UI/UX Design', 
    'Data Science', 
    'Digital Marketing', 
  ];
  hobbies: string[] = [
    'Coding personal projects',
    'Contributing to open source',
    'Attending hackathons',
    'Watching tech talks and conferences',
    'Experimenting with new technologies',
    'Playing video games',
    'Building custom PCs',
    'Listening to podcasts about tech',
    'Creating digital art or graphics',
    'Learning a new programming language'
  ];
  locations = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Kuala Lumpur',
    'Labuan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Perak',
    'Perlis',
    'Pulau Pinang',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu',
  ];
    
  constructor(
    private _fb: FormBuilder, 
    private _httpService: HttpService, 
    private _dialogRef: MatDialogRef<FreelancerAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.freelancerForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{11}$/)]],
      location: ['', [Validators.required]],
      linkedInUrl: '',
      skillsets: [[], Validators.required],
      hobbies: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.freelancerForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.freelancerForm.valid){
      if(this.data){
        this._httpService.updateFreelancer(this.data._id, this.freelancerForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }else{
        this._httpService.addFreelancer(this.freelancerForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    } else {
      // If the form is not valid, mark all form fields as touched
      // so that any validation errors are displayed
      Object.values(this.freelancerForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
