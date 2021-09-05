import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form!: FormGroup;
  id!: string;
  submitted: boolean = false;
  dropdownList: any;
  dropdownSettings: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private userService: UserService, private location: Location) { }
  getData(): Array<any> {
    return [
      { item_id: 1, hvalue: 'Reading', },
      { item_id: 2, hvalue: 'Playing', },
      { item_id: 3, hvalue: 'Drawing', },
      { item_id: 4, hvalue: 'Travelling', },
      { item_id: 5, hvalue: 'Singing ', },

    ];
  }
  ngOnInit(): void {
    this.dropdownList = this.getData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'hvalue',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All'
    };
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      hobbies: ['', Validators.required],
      address: this.formBuilder.array([
        this.formBuilder.control('')
      ])
    })

  }
  
//adress
  get address() {
    return this.form.get('address') as FormArray;
  }
  addAlias() {
    this.address.push(this.formBuilder.control(''));
  }

  get f() { return this.form.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.createUser();
    console.log(this.f)
  }

  private createUser() {
    this.userService.create(this.form.value)
      .subscribe(() => {
        console.log(this.form.value)
        this.router.navigate(['../'], { relativeTo: this.route });
      })

  }

// dropdown//
  getObjectListFromData(ids: string | any[]) {
    return this.getData().filter(item => ids.includes(item.item_id))
  }
  setDefaultSelection() {
    let item = this.getData()[0];
    this.form.patchValue({
      hobbies: [{
        item_id: item['item_id'],
        hvalue: item['hvalue']
      }]
    })
  }

  cancel() {
    this.location.back();
    // this.router.navigate(['../../'], { relativeTo: this.route });

  }
}
