import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  successfullSubmission = false;

  fg = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    zipCode: new FormControl(),
    phone: new FormControl(),
    ssn: new FormControl(),
    borrowAmount: new FormControl(),
    message: new FormControl()
  });

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  async apply(){
    const payload = {
      firstName: this.fg.controls['firstName'].value,
      lastName: this.fg.controls['lastName'].value,
      email: this.fg.controls['email'].value,
      ssn: {
          value: this.fg.controls['ssn'].value,
      },
      address: {
          street: this.fg.controls['street'].value,
          city: this.fg.controls['city'].value,
          zipCode: this.fg.controls['zipCode'].value,
          state: "NJ"
      },
      phoneNumber: this.fg.controls['phone'].value,
      borrowAmount: this.fg.controls['borrowAmount'].value,
      message: this.fg.controls['message'].value,
    };
    this.http.post('http://192.168.1.237:9086/customer', payload).subscribe(response => {
      this.successfullSubmission = true;
    });
  } 
}
