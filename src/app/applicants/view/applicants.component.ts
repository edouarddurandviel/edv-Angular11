import { Component, OnInit } from '@angular/core';
import { ApplicantsService } from '../applicants.service';
import { IntApplicants } from '../applicants.interface';
import {  Router} from '@angular/router';



@Component ({
  selector: 'app-applicants',
  templateUrl: `./applicants.component.html`,
  styleUrls: [`./applicants.component.scss`]
})
export class ApplicantsComponent implements OnInit {

  dataSource!: IntApplicants;
  error!: any;

  constructor(
    private service: ApplicantsService,
    private router: Router,
    ) {}

  

  ngOnInit(): void {
     this.getApplicants()
  }

  getApplicants(){
     this.service.getApplicantsList().subscribe(
        (dataSource) => this.dataSource = dataSource
      );
  }

  delete(id: number) {
    this.service.deleteApplicant(id).subscribe(
      (response) => { 
        response && 
        this.getApplicants() 
      },
      (error) => {
        this.error = error
      }
    );

}

addNew() {
  this.router.navigate(['/applicants/add']);
}


}
