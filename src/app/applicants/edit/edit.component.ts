import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

import { ApplicantsService } from './../applicants.service';
import { MessageService } from './../message/message.service';
import { IntApplicants } from './../applicants.interface';
import {  Router, ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  dataSource!: IntApplicants;
  currentRoute!: number;

  constructor(
    private service: ApplicantsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.currentRoute = this.getRoute(this.route)!
  }

  get theId() {
    return Number(this.profileForm.get('theId'));
  }
  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get appTitle() {
    return this.profileForm.get('appTitle');
  }

  currentId!: number;
  appliId = '';
  submitted = false;
  // reactive form
  profileForm = 
    this.fb.group({
      theId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      appTitle: ['', Validators.required],
    });

  ngOnInit(): void {
    this.service.getApplicant(this.currentRoute)
    .subscribe(dataSource => {
      this.profileForm.patchValue({
          theId: dataSource.id,
          firstName: dataSource.firstName,
          lastName: dataSource.lastName,
          appTitle: dataSource.appTitle,
      });
    });
  }

  getRoute(route: ActivatedRoute){
    const id = route.snapshot.paramMap.get('id');
    return id === null ? undefined : parseInt(id, 10);
  }

  update() {
    this.service.updateApplicant(this.profileForm.value.theId, {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        appTitle: this.profileForm.value.appTitle,
      }).subscribe(() => {
        this.submitted = true;
          this.messageService.add(`Applicant submitted successfully !`);
          this.goTo();
      }, (error) => {
          this.messageService.add(`Applicant. Some error occured ${error}`);
      }, () => {
         this.messageService.add(`Applicant submittion completed`);
      }
    );
  }

  goTo() {
    this.router.navigate(['/applicants']);
  }
}
