import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    userForm: FormGroup;
    states: any[] = [
        {
            stateId: "1",
            stateName: "Delhi",
            city: [
                { cityId: "2", cityName: "North delhi" },
                { cityId: "4", cityName: "West delhi" },
                { cityId: "5", cityName: "Central delhi" },
                { cityId: "1", cityName: "South east delhi" },
                { cityId: "3", cityName: "North west delhi" }
            ]
        },
        {
            stateId: "10",
            stateName: "Gujarat",
            city: [
                { cityId: "193", cityName: "abcxd" },
                { cityId: "200", cityName: "abcd" },
                { cityId: "200", cityName: "abcd" },
                { cityId: "200", cityName: "abcd" },
                { cityId: "200", cityName: "abcd" },
                { cityId: "200", cityName: "abcd" },
                { cityId: "200", cityName: "abcd" },
            ]
        },
    ];
    cities: any[] = [];

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.userForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            age: [null, Validators.required],
            profile: [null, Validators.required],
            experienceDocuments: [null],
            educationalDetails: this.fb.array([this.createEducationGroup()]),
            addressLine1: ['', Validators.required],
            addressLine2: [''],
            state: [null, Validators.required],
            city: [null, Validators.required],
            country: ['India']
        });
    }

    ngOnInit(): void {
        // this.loadStates();
    }

    get educationalDetails(): FormArray {
        return this.userForm.get('educationalDetails') as FormArray;
    }

    createEducationGroup(): FormGroup {
        return this.fb.group({
            institute: ['', Validators.required],
            qualification: ['', Validators.required]
        });
    }

    addEducation(): void {
        this.educationalDetails.push(this.createEducationGroup());
    }

    removeEducation(index: number): void {
        this.educationalDetails.removeAt(index);
    }

    onSubmit(): void {
        if (this.userForm.valid) {
            // Handle form submission
            console.log(this.userForm.value);
        } else {
            alert('Please fill in all required fields.');
        }
    }

    onProfileChange(event): void {
        const file = event.target.files[0];
        this.userForm.patchValue({ profile: file });
    }

    onExperienceChange(event): void {
        const files = event.target.files;
        this.userForm.patchValue({ experienceDocuments: files });
    }

    loadCities(stateId: string): void {
        const selectedState = this.states.find(state => state.stateId === stateId);
        if (selectedState) {
            this.cities = selectedState.city;
        } else {
            this.cities = [];
        }
    }

    onStateChange(stateId: string): void {
        const selectedState = this.states.find(state => state.stateId === stateId);
        if (selectedState) {
            this.cities = selectedState.city;
        } else {
            this.cities = [];
        }
    }
}
